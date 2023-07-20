/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createContext, useContext, useEffect, useState } from "react";
import { PlayContext, usePlay } from "../contexts/play";
import { database } from '..';
import { useRouter } from "expo-router";
import styles from './styles';
import { Header } from 'react-native/Libraries/NewAppScreen';

export function DeckRender({ item, setDeck, nextPage, router }) {
  const handleDeckUpdate = () => {
    setDeck(item);
    console.log("DeckSelect - handling update: " + item.name);
    console.log(`DeckSelect - routing to: ${nextPage}`)
    router.push(nextPage)
  };
  
  const buttonStyle = styles.button2;
  return (
    <View style = {styles.button2}>
      <Button onPress={handleDeckUpdate} style = {buttonStyle}>
        <Text style = {styles.headerTitle}>
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
  const link = playCont.next
  const router = useRouter()

  if (loading) {
    database.get('decks').query().fetch().then(decks => {
      setLoading(false)
      setDecks(decks)
    })
  }

  return (
    <SafeAreaView style = {{ flex: 1, backgroundColor: '#18171a'}}>
      <View>
        <Text style = {styles.guildInfoContainerTitle}>
          Choose a Deck:
        </Text>
      </View>
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