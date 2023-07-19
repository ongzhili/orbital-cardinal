/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { FlatList } from 'react-native';
import { Text, Button} from 'react-native-paper';
import {  useRouter} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext, useState } from "react";
import { GuildContext } from "../../contexts/guild";
import { useAuth } from '../../contexts/auth';
import { supabase } from '../../lib/supabase';
import { DeckSelectRender } from './AddDeckSelect';
import styles from '../styles';

const DEFAULT_DECK = {
  id: -1,
  title: 'None',
  description: '',
}

  export function DropDown({deck, guild, user, text}) {
    const router = useRouter();
    console.log(deck.id);
    console.log(guild.guild.Guild_ID);
    console.log(user.user.id);

    const handleRemove = async () => {
      const { data, error } = await supabase
      .rpc('remove_deck', {
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
      <Button mode="flat" buttonColor="#8f8f8f" labelStyle={styles.joinButton} onPress={handleRemove}>
        {text}
      </Button>
    )

  }



  export default function RemoveDeckSelect() {
    const guildCont = useContext(GuildContext);
    const [init, setInit] = new useState(false);
    const [dataToSend, setDataToSend] = new useState([]);
    const [selectedDeck, setSelectedDeck] = new useState(DEFAULT_DECK);
    const MAX_DESCRIPTION_LENGTH = 100;
    const currentUser = useAuth();
  
    const handleDeckSelect = (deck) => {
      setSelectedDeck(deck);
    };
  

 
    const handleAllDecks = async () => {
      const {data, error} = await supabase
        .from('Decks')
        .select('*')
        .in('id', guildCont.guild.quizzes)
      if (error) {
          setErrMsg(error.message);
          console.log('error in obtaining decks')
          console.log(error);
      } 
      console.log(data[0]);
      setDataToSend(data);
      

    }
  
  if (!init) {
    handleAllDecks();
    setInit(true);
  }

  
    return (
      <SafeAreaView style={{ flexDirection: 'column' }}>
        <View style={styles.guildInfoDescription}>
              <Text style={styles.selectionTitle}>{"Selected Deck: " + selectedDeck.title}</Text>
              <Text style={styles.selectionDesc}>{selectedDeck.description.length > MAX_DESCRIPTION_LENGTH
                ? selectedDeck.description.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
                : selectedDeck.description}
              </Text>
              {selectedDeck.id !== -1 && (
                <DropDown deck = {selectedDeck} guild = {guildCont} user = {currentUser} text = "REMOVE"></DropDown>
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
