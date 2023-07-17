/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createContext, useContext, useEffect, useState } from "react";
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../styles'
import { Deck } from '../../lib/model';
import { PlayContext } from '../../contexts/play';

export default function DeckInfo() {
  const deck = useContext(PlayContext).deck
  const [name, setName] = useState()
  const [desc, setDesc] = useState()
  const router = useRouter()

  return (
    <ScrollView>
      <Text style = {styles.title}>{"Name:"}</Text>
      <TextInput
      placeholder='Name'
      onChangeText={setName}
      defaultValue={deck.name}
      ></TextInput>
      <Text style = {styles.title}>{"Description:"}</Text>
      <TextInput
      placeholder='Description'
      onChangeText={setDesc}
      defaultValue={deck.description}
      ></TextInput>
      <Button
      style = {styles.button}
      onPress = {() => {
        deck.setName(name)
        deck.setDescription(desc)
        router.back()
      }}
      >
        <Text style = {styles.title}>{"Save"}</Text>
      </Button>
    </ScrollView>
  )
}