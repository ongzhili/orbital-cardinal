import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { PlayContext } from '../../contexts/play';
import { useContext } from 'react';
import { useRouter } from "expo-router";
import styles from '../styles'
import { ScrollView } from 'react-native-gesture-handler';

const OPTIONS = [
  {
    id: 0,
    title: 'Edit Deck Info',
    link: "./DeckInfo",
  },
  {
    id: 1,
    title: 'Add/Remove Cards',
    link: "./DeckCards",
  }
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

export default function DeckEdit() {
  const deck = useContext(PlayContext).deck

  return (
    <View>
      <Text style = {styles.title}>{deck.name}</Text>
      <Text style = {styles.title}>{deck.description}</Text>
      <FlatList
      data = {OPTIONS}
      renderItem = {({item}) => 
        <Item item = {item} />
      }
      keyExtractor={item => item.id}>
      </FlatList>
    </View>
  );
}
