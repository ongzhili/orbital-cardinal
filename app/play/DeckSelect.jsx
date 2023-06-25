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


const SAMPLE_DECKS = [
    {
        name: "Deck 1",
        deck :[
            {
                name: '1',
                front: 'What is 1 + 1',
                back: '2',
              },
              {
                name: '2',
                front: 'deck1q2',
                back: '4',
              },
        ]
    },
    {
        name: "Deck 2",
        deck :[
            {
              name: '1',
                front: 'deck2q1',
                back: '1',
              },
              {
                name: '2',
                front: 'deck2q2',
                back: '4',
              },
        ]
    },

];

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
        renderItem = {({item}) => <DeckRender 
                                        item = {item} 
                                        setDeck = {playCont.setDeck} 
                                        nextPage = {link}
                                        router = {router}/>}
        keyExtractor={item => item.name}>
  
        </FlatList>
        </SafeAreaView>
  
      );
  }

  const styles = StyleSheet.create({
    button: {
        backgroundColor:'#D9D9D9',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 40,
      },
      buttonSelected: {
        backgroundColor:'red',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 40,
      },
    title: {
      textAlign: 'center',
      fontSize: 25,
      alignSelf: 'stretch',
      lineHeight: 30,
    },
    image: {
      flex: 1,
      width: 400,
      height: 400,
      resizeMode: 'stretch' ,
      padding: 100,
      marginVertical:20,
    }
  });