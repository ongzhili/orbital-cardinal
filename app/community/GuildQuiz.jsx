/* eslint-disable react/react-in-jsx-scope */
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QuizContext } from '../../contexts/quiz';
import { GuildContext } from '../../contexts/guild';
import { useAuth } from '../../contexts/auth';
import FlipCard from 'react-native-flip-card'
import { useRouter } from "expo-router";
import styles from '../styles';
import { supabase } from '../../lib/supabase';

export default function GuildQuiz() {
  // States used in the flashcard game.

  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0)
  const [loading, setLoading] = useState(true);
  const guild = useContext(GuildContext).guild
  const deck = useContext(QuizContext).quiz
  const currentUser = useAuth()
  const [answer, setAnswer] = useState('')
  const router = useRouter()
  const [flip, setFlip] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [flipRender, setFlipRender] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [numCorrect, setNumCorrect] = useState(0)
  const [finished, setFinished] = useState(false)
  const [allowNext, setAllowNext] = useState(true)

  // Handles fetching of the cards (returned as an array), using the deckid of given context

  const handleAdd = async () => { 
    let { data, error } = await supabase
        .rpc('fetch_test2', {
            deckid: deck.id
    })

    if (error) {
        console.log(error)
    }
    else {
    console.log(data);
    setCards(data);
    }
  }

  // Handles Score submission, then router.backs.

  const handleScoreSubmission = async (score) => {
    
    let { data, error } = await supabase
        .rpc('submit_score', {
            deckid: deck.id, 
            guildid: guild.Guild_ID,
            score: score, 
            userid: currentUser.user.id
    })

    if (error) console.log(error)
    router.back();
  }

  // If not initialized, initialises.

  if (loading) {
    setLoading(false);
    handleAdd();
  }

  // Render

  return (
    <SafeAreaView>
      {
        !finished
          ? <ScrollView> 
              {
              cards.length != 0 
                ? <FlipCard
                  style = {correct == 0 ? styles.card : (correct == 1 ? styles.cardCorrect : styles.cardWrong)}
                  flipHorizontal = {true}
                  flipVertical = {false}
                  clickable = {false}
                  flip = {flip}
                  onFlipStart={() => setAllowNext(false)}
                  onFlipEnd = {() => {
                    setFlipped(!flipped)
                    setAllowNext(true)
                  }}
                >
                  {/* Front */}
                  <View style = {styles.cardFace}>
                  <Text style = {styles.cardText}> {flipRender ? cards[currentCard].back : cards[currentCard].front} </Text>
                  </View>
                  {/* Back */}
                  <View style = {styles.cardFace}>
                  <Text style = {styles.cardText}> {flipRender ? cards[currentCard].front : cards[currentCard].back} </Text>
                  </View>
                </FlipCard>
                : null
              }
              <View style = {styles.buttonContainer}>
              <View style = {{flexDirection: 'row'}}>
                <TextInput
                  placeholder = {"Answer"}
                  onChangeText = {setAnswer}
                  value = {answer}
                ></TextInput>
                <Button
                style = {styles.button}
                onPress = {() => {
                  if (!allowNext) return
                  if (correct == 0) {
                  if (answer.toUpperCase() == cards[currentCard].back.toUpperCase()) {
                    setCorrect(1)
                    setNumCorrect(numCorrect + 1)
                    setAnswer("");
                  }
                  else 
                    setCorrect(2)
                  }
                  setFlip(!flip)
                }}
                >
                    <Text style = {styles.title}>{correct == 0 ? "Submit" : "Flip"}</Text>
                </Button>
              </View>
              <Button
              style = {styles.button}
              onPress = {() => {
                if (!allowNext) return
                if (currentCard < cards.length - 1) {
                  setFlipRender(flipped)
                  setCorrect(0)
                  setCurrentCard(currentCard + 1)
                  setAnswer("");
                }
                else 
                  setFinished(true)
              }}
              >
                  <Text style = {styles.title}>{currentCard < cards.length - 1 ? "Next Card" : "Finish"}</Text>
              </Button>
              </View>
            </ScrollView>
          : <View>
              <Text style = {styles.title}>{`Your Score: ${numCorrect}/${cards.length}`}</Text>
              <Button style = {styles.button} onPress = {() => handleScoreSubmission(correct)}>
                <Text style = {styles.title}>{"Back"}</Text>
              </Button>
            </View>
      }
  </SafeAreaView>

  );
}

