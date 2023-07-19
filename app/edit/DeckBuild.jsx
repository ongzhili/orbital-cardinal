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

export default function DeckBuild() {
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const router = useRouter()

  return (
    <View style={styles.mainMenuContainer2}>
      <Text style = {styles.guildInfoContainerTitle}>
        Enter Deck info:
      </Text>
      <Text style = {styles.title}>{"Name:"}</Text>
      <TextInput
        placeholder='Name'
        onChangeText={setName}
      ></TextInput>
      <Text style = {styles.title}>{"Description:"}</Text>
      <TextInput
        placeholder='Description'
        onChangeText={setDesc}
      ></TextInput>
      <Button
        style = {[styles.button, {borderRadius: 0}]}
        onPress = {() => {
          Deck.makeDeck(name, desc)
          router.back()
        }}
        >
        <Text style = {styles.headerTitle}>{"Create Deck"}</Text>
      </Button>
    </View>
  )
}