import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { PlayContext } from '../../contexts/play';
import { useContext } from 'react';
import { useRouter } from "expo-router";
import styles from '../styles'

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
    link: ''
  }
]
  
function Item( {item, onPress, router} ) { 
  return (
      <View style = {styles.button}>
        <Button 
        style = {styles.button}
        onPress = {() => {
          console.log(`ModeSelect - ${item.title}`)
          console.log(item.next)
          onPress(item.next)
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

export default function EditSelect() {
  const playCont = useContext(PlayContext)
  const router = useRouter()
  
  return (
    <View>
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
  );
}