import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { PlayContext } from '../../contexts/play';
import { useContext } from 'react';
import { useRouter } from "expo-router";
import styles from '../styles'
import { SafeAreaView } from 'react-native-safe-area-context';

const OPTIONS = [
  {
    id: 0,
    title: 'Make Deck',
    link: "./DeckBuild",
  },
  {
    id: 1,
    title: 'Edit Deck',
    link: "../DeckSelect",
    next: "./edit/DeckEdit"
  },
  {
    id: 2,
    title: 'Make Card',
    link: './CardBuild'
  },
  {
    id: 3,
    title: 'Edit Card',
    link: './CardEdit'
  },
  {
    id: 4,
    title: 'Get Online Decks',
    link: './BrowseDecks'
  }
]
  
function Item( {item, onPress, router} ) { 
  return (
      <View style = {styles.button3}>
        <Button 
        style = {[styles.button, {borderRadius: 0}]}
        onPress = {() => {
          console.log(`ModeSelect - ${item.title}`)
          console.log(item.next)
          onPress(item.next)
          router.push(item.link)
        }}
        >
            <Text style = {styles.selectionTitle}>
                {item.title}
            </Text>
        </Button>
      </View>
  )
}

export default function EditSelect() {
  const playCont = useContext(PlayContext)
  const router = useRouter()
  
  return (
    <SafeAreaView style = {{flex: 1, backgroundColor: '#18171a'}}>
      <View style = {{backgroundColor: '#18171a'}}>
      <Image style = {styles.loginImage} source = {require('../../assets/adaptive-icon.png')}>
      </Image>
      <FlatList
      data = {OPTIONS}
      renderItem = {({item}) => 
        <Item 
        item = {item} 
        onPress = {playCont.setLink}
        router = {router}
        />}
      keyExtractor={item => item.id}>

      </FlatList>
      </View>

    </SafeAreaView>
  );
}