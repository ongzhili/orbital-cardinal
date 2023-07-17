import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createContext, useContext, useEffect, useState } from "react";
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../styles'
import { Deck } from '../../lib/model';
import { PlayContext } from '../../contexts/play';
import { database } from '../..';
import SelectMultiple from 'react-native-select-multiple'

export default function DeckCards() {
  const deck = useContext(PlayContext).deck
  const [cards, setCards] = useState([])
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  if (loading) {
    setLoading(false)
    database.get('cards').query().fetch().then(cards => setCards(cards.map(card => {return {label: card.name, value: card}})))
    deck.getCards().then(cards => setSelected(cards.map(card => {return {label: card.name, value: card}})))
  }

  return (
    <View>
      <SelectMultiple
      items = {cards}
      selectedItems={selected}
      onSelectionsChange={setSelected}
      />
      <View
      style = {styles.buttonContainer}
      >
        <Button
        style = {styles.button}
        onPress = {() => {
          deck.setCards(...selected.map(item => item.value))
          router.back()
        }}
        >
          <Text style = {styles.title}>{"Save"}</Text>
        </Button>
      </View>
    </View>
  )
}