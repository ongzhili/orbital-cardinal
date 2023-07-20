/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { FlatList} from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { useRouter} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext, useState } from "react";
import { GuildContext } from "../../contexts/guild";
import { useAuth } from '../../contexts/auth';
import { supabase } from '../../lib/supabase';
import styles from '../styles';

const DEFAULT_DECK = {
  id: -1,
  title: 'None',
  description: '',
}

// Renders options.
export function DeckSelectRender({ item, setSelectedDeck, selectedDeck}) {

  const handleDeckUpdate = () => {
    setSelectedDeck(item);
  };

  return (
    <View style={item === selectedDeck ? styles.buttonSelected : styles.button}>
      <Button onPress={handleDeckUpdate}>
        <Text style={styles.selectionTitle}>{item.title}</Text>
      </Button>
    </View>
    );
}

// Facilitates adding quiz to deck
export function DropDown({deck, guild, user}) {
  const router = useRouter();

  const handleAdd = async () => {
    const { data, error } = await supabase
    .rpc('add_deck', {
        deckid: deck.id,
        guildid: guild.guild.Guild_ID,
        userid: user.user.id
    });
    
    if (error) {
      console.log(error);
    }
    router.replace("./Community")
  }
  return (
    <Button mode="flat" buttonColor="#8f8f8f" labelStyle={styles.joinButton} onPress={handleAdd}>
      Add to Community
    </Button>
  )
}

// Default render
export default function AddDeckSelect() {
  const guildCont = useContext(GuildContext);
  const [init, setInit] = new useState(false);
  const [dataToSend, setDataToSend] = new useState([]);
  const [selectedDeck, setSelectedDeck] = new useState(DEFAULT_DECK);
  const MAX_DESCRIPTION_LENGTH = 100;
  const currentUser = useAuth();

  // Handles selection of deck
  const handleDeckSelect = (deck) => {
    setSelectedDeck(deck);
  };
  
  // Fetches all decks
  const handleAllDecks = async () => {

    let { data, error } = await supabase
    .rpc('get_deck_except_ids', {
      ids: guildCont.guild.quizzes
    })
  
    if (error) {
      console.log(error)
    }
    setDataToSend(data);
  }
  
    // Initialization
  if (!init) {
    handleAllDecks();
    setInit(true);
  }

  // Render
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#18171a',flexDirection: 'column' }}>
      <View style={styles.guildInfoDescription}>
        <Text style={styles.selectionTitle}>{"Selected Deck: " + selectedDeck.title}</Text>
        <Text style={styles.selectionDesc}>{selectedDeck.description.length > MAX_DESCRIPTION_LENGTH
          ? selectedDeck.description.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
          : selectedDeck.description}
        </Text>
        {selectedDeck.id !== -1 && (
          <DropDown deck = {selectedDeck} guild = {guildCont} user = {currentUser}></DropDown>
        )}
      </View>
        <FlatList
        style={{}}
        data={dataToSend}
        renderItem={({ item }) => (
          <DeckSelectRender item={item} setSelectedDeck={setSelectedDeck} selectedDeck={selectedDeck} />
        )}
        keyExtractor={(item) => item.title}
        />
    </SafeAreaView>
  );
}


