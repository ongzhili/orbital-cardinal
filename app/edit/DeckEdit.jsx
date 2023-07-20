import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { PlayContext } from '../../contexts/play';
import { useContext, useState } from 'react';
import { useRouter } from "expo-router";
import styles from '../styles'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/auth';
import { supabase } from "../../lib/supabase";

const OPTIONS = [
  {
    id: 0,
    title: 'Edit Info',
    link: "./DeckInfo",
  },
  {
    id: 1,
    title: 'Add/Remove Cards',
    link: "./DeckCards",
  },
  {
    id: 2,
    title: 'Delete'
  }
]

function Item( {item, router, deck} ) { 
  return (
      <View style = {[styles.button4, {textAlign: 'center'}]}>
        <Button 
          style = {styles.button4}
          onPress={async () => {
            if (item.id == 2) {
              await deck.markAsDeleted()
              router.back
            } else
              router.push(item.link)
          }}
        >
            <Text style = {styles.title}>
                {item.title}
            </Text>
        </Button>
      </View>
  )
}

export default function DeckEdit() {
  const deck = useContext(PlayContext).deck
  const [errMsg, setErrMsg] = useState('');
  const currentUser = useAuth();
  const router = useRouter()
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(false)
    let { data, error } = await supabase.rpc('get_deck_owner', {
      deckid: deck.id
    })
    if (error) console.log(error)
    else setOwner(data)
  }

  if (loading) load()

  return (
    <SafeAreaView style = {{flex: 1, backgroundColor: '#18171a'}}>
      <View>
        <Text style = {styles.guildInfoContainerTitle}>{deck.name}</Text>
        <Text style = {styles.selectionDesc}>{deck.description}</Text>
        <FlatList
          data = {OPTIONS}
          renderItem = {({item}) => 
            <Item 
              item = {item} 
              router = {router}
              deck = {deck}
            />
          }
          keyExtractor={item => item.id}
        />
        {/* This is to conditionally render button */}
        {currentUser.user && 
        <Button
          style = {[styles.button, {borderRadius: 0, }]}
          labelStyle = {[styles.title,{color: 'white'}]}
          onPress ={async () => {
            let cards = await deck.getCards()
            cards = cards.map(card => {return {id: card.id, name: card.name, front: card.front, back: card.back, updated_at: card.updated_at}})
            let { data, error } = await supabase.rpc('upload_card_array', {
              cards: cards, 
              deckid: deck.id, 
              description: deck.description, 
              title: deck.name,
              userid: currentUser.user.id
            })
            if (error) console.error(error)
            else console.log(data)
            setLoading(true)
          }}
        >
          Upload
        </Button>}
        {((currentUser.user) && (owner != null && owner == currentUser.user.id)) && 
        <Button
          style = {[styles.button, {borderRadius: 0, }]}
          labelStyle = {[styles.title,{color: 'white'}]}
          onPress={async () => {
            let { data, error } = await supabase.rpc('delete_deck', {
              deckid: deck.id
            })
            if (error) console.error(error)
            router.back()
          }}
        >
          Remove Online
        </Button>}
      </View>
    </SafeAreaView>
  );
}
