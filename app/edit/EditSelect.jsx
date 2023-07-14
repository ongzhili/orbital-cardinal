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
    link: "./DeckEdit",
  },
  {
    id: 2,
    title: 'Make Card',
    link: './CardBuild'
  },
]
  
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


export default function EditSelect() {
  const playCont = useContext(PlayContext)
  const router = useRouter()
  
  return (
    <View>
      <FlatList
      data = {OPTIONS}
      renderItem = {({item}) => <Item item={item} />}
      keyExtractor={item => item.id}>
      </FlatList>
    </View>
  );
}