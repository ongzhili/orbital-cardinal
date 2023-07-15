/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createContext, useContext, useEffect, useState } from "react";
import { PlayContext } from "../../contexts/play";
import { database } from '../..';
import { useRouter } from "expo-router";

export function DeckRender({ item, setDeck, nextPage, router }) {
  const handleDeckUpdate = () => {
    setDeck(item);
    console.log("DeckSelect - handling update: " + item.name);
    console.log(`DeckSelect - routing to: ${nextPage}`)
    router.push(nextPage)
  };
  
  const buttonStyle = styles.button;
  return (
    <View style = {styles.button}>
      <Button onPress={handleDeckUpdate} style = {buttonStyle}>
        <Text style = {styles.name}>
          {item.name}
        </Text>
      </Button>
    </View>
  )
}

export default function DeckSelect({deck}) {
  const [decks, setDecks] = useState([])
  const [loading, setLoading] = useState(true)

  const playCont = useContext(PlayContext);
  const link = `./` + playCont.mode
  const router = useRouter()

  if (loading) {
    database.get('decks').query().fetch().then(decks => {
      setLoading(false)
      setDecks(decks)
    })
  }

  return (
    <SafeAreaView>
    <FlatList
    data = {decks}
    renderItem = {({item}) => 
      <DeckRender 
      item = {item} 
      setDeck = {playCont.setDeck} 
      nextPage = {link}
      router = {router}/>}
      keyExtractor={item => item.name}>

    </FlatList>
    </SafeAreaView>

  );
}