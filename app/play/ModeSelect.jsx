import { View } from 'react-native';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { PlayContext, usePlay } from '../../contexts/play';
import { playCont } from '../DeckSelect';
import { useContext } from 'react';
import { useRouter } from "expo-router";
import styles from "../styles"
import { SafeAreaView } from 'react-native-safe-area-context';

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
          labelStyle = {[styles.selectionTitle, {color: 'white'}]}
          onPress = {() => {
            console.log(`ModeSelect - ${item.title}`)
            onPress(item.next)
            router.push(item.link)
          }}
        >
          {item.title}
        </Button>
      </View>
  )
}

// Selects the play mode, and brings the users to the appropriate page
export default function ModeSelect() {
  const playCont = usePlay()
  const router = useRouter()

  return (
    <SafeAreaView style = {{flex: 1, backgroundColor: '#18171a'}}>
      <Image style = {styles.loginImage} source = {require('../../assets/adaptive-icon.png')}/>
      <FlatList
        data = {OPTIONS}
        renderItem = {({item}) => 
          <Item 
            item = {item} 
            onPress = {playCont.setLink}
            router = {router}
          />
        }
        keyExtractor={item => item.id}>
      </FlatList>

    </SafeAreaView>
  );
}