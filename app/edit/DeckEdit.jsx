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
  },
]

function Item( {item} ) { 
  return (
      <View style = {[styles.button, {textAlign: 'center'}]}>
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
  const [errMsg, setErrMsg] = useState('');
  const currentUser = useAuth();
  console.log(currentUser);

  return (
    <SafeAreaView style = {{flex: 1, backgroundColor: '#18171a'}}>
      <View>
        <Text style = {styles.guildInfoContainerTitle}>{deck.name}</Text>
        <Text style = {styles.selectionDesc}>{deck.description}</Text>
        <FlatList
        data = {OPTIONS}
        renderItem = {({item}) => 
          <Item item = {item} />
        }
        keyExtractor={item => item.id}>
        </FlatList>
        {/* This is to conditionally render button */}
        {currentUser.user && <Button>Upload</Button>}
        {/* Insert upload function here. */}
        <Button
          style = {[styles.button, {borderRadius: 0, }]}
          labelStyle = {[styles.title,{color: 'white'}]}
          onPress ={{}}
        >Upload</Button>
        {errMsg !== "" && <Text style = {styles.errMsg}>{"Error: " + errMsg}</Text>}
      </View>
    </SafeAreaView>
  );
}
