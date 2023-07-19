import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { PlayContext, usePlay } from '../../contexts/play';
import { playCont } from '../DeckSelect';
import { useContext } from 'react';
import { useRouter } from "expo-router";
import styles from "../styles"

const OPTIONS = [
  {
    id: 0,
    title: 'Review',
    link: "../DeckSelect",
    next: "./play/Review"
  },
  {
    id: 1,
    title: 'Quiz',
    link: "../DeckSelect",
    next: "./play/Quiz"
  },
]

function Item( {item, onPress, router} ) { 
  return (
      <View style = {styles.button}>
        <Button 
        style = {styles.button}
        onPress = {() => {
          console.log(`ModeSelect - ${item.title}`)
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

export default function ModeSelect() {
  const playCont = usePlay()
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