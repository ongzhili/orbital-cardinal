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
    <View style={styles.mainMenuContainer2}>
      <Text style = {styles.guildInfoContainerTitle}>
        Update Deck info:
      </Text>
      <Text style = {styles.title}>{"Name:"}</Text>
      <TextInput
        style={[styles.inputContainer, {marginHorizontal: 15}]}
        placeholder='Name'
        onChangeText={setName}
        defaultValue={deck.name}
      ></TextInput>
      <Text style = {styles.title}>{"Description:"}</Text>
      <TextInput
        style={[styles.inputContainer, {marginHorizontal: 15}]}
        placeholder='Description'
        onChangeText={setDesc}
        defaultValue={deck.description}
        multiline
      ></TextInput>
      <Button
      style = {[styles.button, {borderRadius: 0}]}
      onPress = {() => {
        deck.setName(name)
        deck.setDescription(desc)
        router.back()
      }}
      >
        <Text style = {styles.headerTitle}>{"Save"}</Text>
      </Button>
    </View>
  )
}