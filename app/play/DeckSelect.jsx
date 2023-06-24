/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createContext, useContext, useEffect, useState } from "react";
import { DeckContext } from "../../contexts/deck";
import { database } from '../..';


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

export function DeckRender({ item, setDeck, selected, onSelect }) {



    const handleDeckUpdate = () => {
        setDeck(item.deck);
        onSelect(item.name);
        console.log("DeckSelect - handling update: " + item.name);
      };
    
    const buttonStyle = selected ? styles.buttonSelected : styles.button;
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

export default function deckSelect({deck}) {
    const [flashcards, setFlashcards] = useState(SAMPLE_DECKS);
    const [selectedDeck, setSelectedDeck] = useState(null);
    const [decks, setDecks] = useState([])
    const [loading, setLoading] = useState(true)

    const deckCont = useContext(DeckContext);

    if (loading) {
      database.get('decks').query().fetch().then(decks => {
        setLoading(false)
        setDecks(decks)
      })
    }

    const handleSelect = (name) => {
        setSelectedDeck(name);
    };

      return (
        <SafeAreaView>
        <FlatList
        data = {decks}
        renderItem = {({item}) => <DeckRender 
                                        item={item} 
                                        setDeck={deckCont.setDeck} 
                                        selected={item.name === selectedDeck}
                                        onSelect={handleSelect}/>}
        keyExtractor={item => item.name}>
  
        </FlatList>
        <Link href= './deckPlay'>
            <Button  style = {styles.button}>
                <Text style = {styles.title}>
                    Play
                </Text>
            </Button>
        </Link>
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