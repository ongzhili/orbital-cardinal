/* eslint-disable react/react-in-jsx-scope */
import { View, ScrollView, Dimensions } from 'react-native';
import { StatusBar, setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlayContext } from '../../contexts/play';
import { Card, Deck } from '../../lib/model'
import FlipCard from 'react-native-flip-card'
import { database } from '../..';
import { useRouter } from "expo-router";
import styles from '../styles';

export default function Quiz() {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0)
  const [loading, setLoading] = useState(true);
  const deck = useContext(PlayContext).deck;
  const [answer, setAnswer] = useState('')
  const router = useRouter()
  const [flip, setFlip] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [flipRender, setFlipRender] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [numCorrect, setNumCorrect] = useState(0)
  const [finished, setFinished] = useState(false)
  const [allowNext, setAllowNext] = useState(true)


  if (loading) {
    setLoading(false)
    deck.getCards().then(cards => setCards(cards))
  }

  return (
    <SafeAreaView style = {{flex: 1, backgroundColor: '#18171a'}}>
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
              <Text style = {styles.scoreValue}>{`Your Score: ${numCorrect}/${cards.length}`}</Text>
              <Button style = {styles.button} onPress = {router.back}>
                <Text style = {styles.title}>{"Back"}</Text>
              </Button>
            </View>
      }
  </SafeAreaView>

  );
}

