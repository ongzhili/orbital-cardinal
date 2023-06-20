/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createContext, useContext, useEffect, useState } from "react";
import { DeckContext } from "../../contexts/deck";


const SAMPLE_DECKS = [
    {
        title: "Deck 1",
        deck :[
            {
                title: '1',
                front: 'What is 1 + 1',
                back: '2',
              },
              {
                title: '2',
                front: 'deck1q2',
                back: '4',
              },
        ]
    },
    {
        title: "Deck 2",
        deck :[
            {
              title: '1',
                front: 'deck2q1',
                back: '1',
              },
              {
                title: '2',
                front: 'deck2q2',
                back: '4',
              },
        ]
    },

];

export function DeckRender({ item, setDeck, selected, onSelect }) {



    const handleDeckUpdate = () => {
        setDeck(item.deck);
        onSelect(item.title);
        console.log(item.title);
      };
    
    const buttonStyle = selected ? styles.buttonSelected : styles.button;
    return (
        <View style = {styles.button}>
           <Button onPress={handleDeckUpdate} style = {buttonStyle}>
                <Text style = {styles.title}>
                    {item.title}
                </Text>
            </Button>
             
        </View>
    )
}



export default function deckSelect({deck}) {
    const [flashcards, setFlashcards] = useState(SAMPLE_DECKS);
    const [selectedDeck, setSelectedDeck] = useState(null);

    const deckCont = useContext(DeckContext);

    const handleSelect = (title) => {
        setSelectedDeck(title);
    };

      return (
        <SafeAreaView>
        <FlatList
        data = {SAMPLE_DECKS}
        renderItem = {({item}) => <DeckRender 
                                        item={item} 
                                        setDeck={deckCont.setDeck} 
                                        selected={item.title === selectedDeck}
                                        onSelect={handleSelect}/>}
        keyExtractor={item => item.title}>
  
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