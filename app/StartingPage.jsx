/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { useAuth } from '../contexts/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase, getSesh } from '../lib/supabase';
import { database } from '..';



const DATA = [
    {
      id: '1',
      title: 'Play',
      link: "./play/ModeSelect",
    },
    {
      id: '2',
      title: 'Create',
      link: "./edit/EditSelect",
    },
    {
      id: '3',
      title: 'Community',
      link: "./community/commHome",
    },
    {
      id: '4',
      title: 'For Joe',
      link: "./BrowseDecks",
    },
  ];

function Item( {item} ) { 
    return (
        <View style = {styles.button}>
          <Link href= {item.link}>
            <Button style = {styles.button}>
                <Text style = {styles.title}>
                    {item.title}
                </Text>
            </Button>
          </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    button: {
      backgroundColor: '#D9D9D9',
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



export function StartingPage() {
    return (
      <View>
        <Image style = {styles.image} source = {require('../assets/adaptive-icon.png')}>
        </Image>
        <FlatList
        data = {DATA}
        renderItem = {({item}) => <Item item={item} />}
        keyExtractor={item => item.id}>

        </FlatList>
        <Button onPress = {testfunc}>Upload</Button>

      </View>
    );
}

const TEST_CARDS = [
  {
    id: '44444444-3333-1111-1111-111111111111',
    name: 'appTestWithDiffName',
    front: 'frontApp1',
    back: 'backApp1',
    updated_at: '2023-07-04 21:06:28.134891+00'

  },
  {
    id: '22222222-3333-1111-1111-111111111111',
    name: 'appTest2',
    front: 'frontApp2',
    back: 'backApp2',
    updated_at: '2023-07-04 21:06:28.134891+00'

  }
]

const TEST_UUID = '12345678-1234-1234-1234-123456789abc'
const TEST_TITLE = 'AppTest'
const TEST_DESC = 'AppDesc'

const testfunc = async () => {
  let decks = await database.get('decks').query().fetch()
  let deck = decks[0]
  let cards = await deck.getCards()
  cards = cards.map(card => {return {id: card.id, name: card.name, front: card.front, back: card.back, updated_at: card.updated_at}})
  let { data, error } = await supabase
    .rpc('upload_card_array', {
      cards: cards, 
      deckid: deck.id, 
      description: deck.description, 
      name: deck.name
    })
  
  if (error) console.error(error)
  else console.log(data)

}