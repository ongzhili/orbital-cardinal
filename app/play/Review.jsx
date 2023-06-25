/* eslint-disable react/react-in-jsx-scope */
import { View, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlayContext } from '../../contexts/play';
import { Card, Deck } from '../../lib/model'
import FlipCard from 'react-native-flip-card'
import { database } from '../..';
import { useRouter } from "expo-router";

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

export default function Review() {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0)
  const [loading, setLoading] = useState(true);
  const deck = useContext(PlayContext).deck;
  const router = useRouter()
  const [flipped, setFlipped] = useState(false)
  const [flipRender, setFlipRender] = useState(false)

  if (loading) {
    setLoading(false)
    database.get('cards').query().fetch().then(async cards => {
      setCards(cards)
    })
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {
          cards.length != 0 
            ? <FlipCard
                style = {styles.card}
                flipHorizontal = {true}
                flipVertical = {false}
                onFlipStart = {() => setFlipped(!flipped)}
              >
                {/* Front */}
                <View style = {styles.side}>
                  <Text style = {styles.cardText}> {flipRender ? cards[currentCard].back : cards[currentCard].front} </Text>
                </View>
                {/* Back */}
                <View style = {styles.side}>
                  <Text style = {styles.cardText}> {flipRender ? cards[currentCard].front : cards[currentCard].back} </Text>
                </View>
              </FlipCard>
            : null
        }
        <View style = {styles.buttonContainer}>
          <Button
            style = {styles.button}
            onPress = {() => {
              if (currentCard < cards.length - 1) {
                setFlipRender(flipped)
                setCurrentCard(currentCard + 1)
              }
              else 
                router.back()
            }}
          >
            <Text style = {styles.title}>{currentCard != cards.length - 1 ? "Next Card" : "Finish"}</Text>
          </Button>
        </View>
      </ScrollView>
  </SafeAreaView>

  );
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginBottom: 20,
  },
  side: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    alignSelf: 'center',
    color: '#FFFFFF'
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    alignSelf: 'center',
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
  cardCorrect: {
    backgroundColor: '#3CB043',
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
  cardWrong: {
    backgroundColor: '#FF0033',
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
  button: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 40,
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    margin: 10,
  },
});

