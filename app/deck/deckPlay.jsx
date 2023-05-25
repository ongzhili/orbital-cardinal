/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { Link } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  flashCard: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  });


  export function FlashCard({ flashCard }) {
    const [flip, setFlip] = useState(false);
    const [correct, setCorrect] = useState('');
    const [answer, setAnswer] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const checkCorrectness = () => {
      console.log(answer);
      if (answer == flashCard.answer) {
        setCorrect('Correct! ');
      } else {
        setCorrect('Wrong! ');
      }
      setFlip(true);
      setSubmitted(true);
      return (
        <View>
          <Text>asdasdas</Text>
        </View>
      )
    
    }

    return (
      <View style = {styles.container}>
      <View style={styles.flashCard}>
        {flip ? (
          <View>
            <Text style={styles.title}>
              {correct}The Answer is: {flashCard.answer}
            </Text>
          </View>
        ) : (
          <Text style={styles.title}>{flashCard.question}</Text>
        )}
        {!submitted && ( // Render TextInput and Button only when submitted is false
          <>
            <TextInput value={answer} onChangeText={setAnswer} />
            <Button onPress={checkCorrectness}>Submit</Button>
          </>
        )}
      </View></View>
    );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'What is 2 + 2',
    answer: '4',
  },
  {
    id: 2,
    question: 'q2',
    answer: '4',
  },
]

export default function deckPlay() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)
    return (
      <SafeAreaView>
      <FlatList
      data = {SAMPLE_FLASHCARDS}
      renderItem = {({item}) => <FlashCard flashCard={item} />}
      keyExtractor={item => item.id}>

      </FlatList>
      </SafeAreaView>

    );
}

