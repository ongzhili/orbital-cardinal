/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createContext, useContext, useEffect, useState } from "react";
import { PlayContext } from "../../contexts/play";
import { database } from '../..';
import { useRouter } from "expo-router";
import styles from '../styles';

export function CardRender({ item, setCard, nextPage, router }) {
  const handleDeckUpdate = () => {
    setCard(item);
    console.log("CardSelect - handling update: " + item.name);
    router.push("./CardEdit")
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
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)

  const playCont = useContext(PlayContext);
  const link = playCont.next
  const router = useRouter()

  if (loading) {
    database.get('cards').query().fetch().then(cards => {
      setLoading(false)
      setCards(cards)
    })
  }

  return (
    <SafeAreaView style = {{ flex: 1, backgroundColor: '#18171a'}}>
      <View>
        <Text style = {styles.guildInfoContainerTitle}>
          Choose a Card:
        </Text>
      </View>
      <FlatList
        data = {cards}
        renderItem = { ({item}) => 
          <CardRender 
          item = {item} 
          setCard = {playCont.setCard} 
          nextPage = {link}
          router = {router}/>}
          keyExtractor={item => item.name
        }
      />
    </SafeAreaView>

  );
}