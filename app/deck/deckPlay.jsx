/* eslint-disable react/react-in-jsx-scope */
import { View, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { Link } from 'expo-router';
import { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlashCard from './FlashCard';
import { DeckContext } from '../../contexts/deck';
import { Card, Deck } from '../../lib/model'


const SAMPLE_FLASHCARDS = [
  {
    title: '1',
    front: 'What is 2 + 2',
    back: '4',
  },
  {
    title: '2',
    front: 'q2',
    back: '4',
  },
]


/**
 * @param {Card} card 
 * @returns html
 */
function renderCard({cards}) {
  console.log(cards.front)
  card = cards

  return (
    <ScrollView>
      <FlipCard
        style = { styles.card }
      >
        {/* Front */}
        <View style = {styles.card}>
          <Text style = {styles.title}> {cards.front} </Text>
        </View>
        {/* Back */}
        <View style = {styles.card}>
          <Text style = {styles.title}> {cards.back} </Text>
        </View>
      </FlipCard>
    </ScrollView>
  )
}


  // return (
  //   <SafeAreaView>
  //     <ScrollView >
  //       <FlipCard
  //         style = { styles.card }
  //       >
  //         {/* Front */}
  //         <View style = {styles.card}>
  //           <Text style = {styles.title}> {card.front} </Text>
  //         </View>
  //         {/* Back */}
  //         <View style = {styles.card}>
  //           <Text style = {styles.title}> {card.back} </Text>
  //         </View>
  //       </FlipCard>
  //     </ScrollView>
  //   </SafeAreaView>
  // )

export default function deckPlay() {
  const [card, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentDeck = useContext(DeckContext);

  return (
    <SafeAreaView>
    <FlatList
    data = {currentDeck.deck}
    renderItem = {({item}) => <RenderCard cards={item} />}
    keyExtractor={item => item.id}>

    </FlatList>
    </SafeAreaView>

  );
}

// export default function deckPlay() {
//   const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)
//   const currentDeck = useContext(DeckContext);
    // return (
    //   <SafeAreaView>
    //   <FlatList
    //   data = {currentDeck.deck}
    //   renderItem = {({item}) => <FlashCard flashCard={item} />}
    //   keyExtractor={item => item.id}>

    //   </FlatList>
    //   </SafeAreaView>

    // );
// }

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginBottom: 20,
  },
  flashCard: {
    backgroundColor: '#825950',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    borderRadius: 30,
    justifyContent: 'space-around',
    height: 200,
  },
  title: {
    fontSize: 50,
    marginBottom: 20,
    marginTop: 20,
    alignSelf: 'center',
    color: '#FFFFFF'
  },
  input: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#03254c',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    width: width - 20,
    height: height - 200,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 0,
    flex: 1,
  },
  image: {
    flex: 1,
    width: 400,
    height: 400,
    resizeMode: 'stretch' ,
    padding: 100,
    marginVertical:20,
  },

  });

