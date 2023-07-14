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
import styles from '../styles'

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
    deck.getCards().then(cards => setCards(cards))
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
                onFlipEnd = {() => setFlipped(!flipped)}
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
            <Text style = {styles.title}>{currentCard < cards.length - 1 ? "Next Card" : "Finish"}</Text>
          </Button>
        </View>
      </ScrollView>
  </SafeAreaView>

  );
}