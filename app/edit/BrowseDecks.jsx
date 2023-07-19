import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChoiceRender } from "../community/browseGuilds";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { supabase } from "../../lib/supabase";
import { Button } from "react-native-paper";
import { Card, Deck } from "../../lib/model";
import styles from "../styles";



// Default Deck
const DEFAULT_DECK = {
  id: -1,
  title: 'None',
  description: '',
}

const MAX_DESCRIPTION_LENGTH = 100;

export function DeckDropDown({deck, cardArray, setCardArray}) {

  const handleAdd = async () => { 
    let { data, error } = await supabase
      .rpc('fetch_test2', {
        deckid: deck.id
    })

    if (error) {
      console.log(error)
    }
    else {
      
      console.log(data);
    }

    // Save to local DB.
    let arr = []
    for (card of data) {
      arr.push(await Card.makeIfAbsent(card))
    }
    let dec = await Deck.update(deck)
    await dec.setCards(...arr)
  }

  return (
    <Button mode="flat" buttonColor="#8f8f8f" labelStyle={styles.joinButton} onPress={handleAdd}>
      Save Deck
    </Button>
  )

}

export default function BrowseDecks() {
  // Makes sure that it is only rendered once
  const [init, setInit] = new useState(false);

  // State variables, quite self-explanatory I think.
  const [selectedDeck, setSelectedDeck] = new useState(DEFAULT_DECK);
  const [deckData, setDeckData] = new useState([]);

  // CardArray
  const [cardArray, setCardArray] = new useState([]);



  // Async function to fetch all decks from the database.
  const fetchDecks = async () => {
    const {data, error} = await supabase
      .from('Decks')
      .select('*')
    if (error) {
      setErrMsg(error.message);

      // Log for testing purposes
      console.log('error in obtaining decks')
      console.log(error);
    } 
    // Log for testing purposes
    console.log(data);

    setDeckData(data);
  }

  // Function to handle deck select (for ChoiceRender)
  const handleDeckSelect = (deck) => {
    setSelectedDeck(deck);
    setCardArray([]); // Clear the cardArray when a new deck is selected (It seems to work, albeit kinda jank).
    console.log(cardArray);
  };
  
  // If not initialized, fetches all decks.
  if (!init) {
    fetchDecks();
    setInit(true);
  }
  
  return (
    <SafeAreaView style={{ flexDirection: 'column', flex: 1}}>
      {/* This section renders the top container that informs you what you have selected*/}
      <View style={styles.listHeader}>

        {/* 1st Text is title, 2nd text is description, but checks if description is too long and truncates accordingly */}
        <Text style={styles.selectionTitle}>{"Selected Deck: " + selectedDeck.title}</Text>
        
        <Text style={styles.selectionDesc}>{selectedDeck.description.length > MAX_DESCRIPTION_LENGTH
          ? selectedDeck.description.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
          : selectedDeck.description}
        </Text>
        {/* Dropdown option renders if you have selected a deck (i.e deckid not -1) */}
        <View style={styles.bottomButtonContainer}>
        {selectedDeck.id !== -1 && (
          <DeckDropDown deck = {selectedDeck} cardArray = {cardArray} setCardArray = {setCardArray}/>
          )}
        </View> 
      </View>

      <View>
        {/* This flatlist renders data fetched from handleDeckSelect*/}
        <FlatList
          style = {{}}
          data = {deckData}
          renderItem={({ item }) => (
            <ChoiceRender item={item} setItem={handleDeckSelect} selectedItem={selectedDeck} />
          )}
          keyExtractor={(item) => item.title}               
        />
      </View>
    </SafeAreaView>
  )
}