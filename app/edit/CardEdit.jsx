/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { createContext, useContext, useEffect, useState } from "react";
import styles from '../styles'
import { PlayContext } from '../../contexts/play';

export default function DeckInfo() {
  const card = useContext(PlayContext).card
  const [name, setName] = useState(card.name)
  const [front, setFront] = useState(card.front)
  const [back, setBack] = useState(card.back)
  const router = useRouter()

  return (
    <View style={styles.mainMenuContainer2}>
      <Text style = {styles.guildInfoContainerTitle}>
        Update Card info:
      </Text>
      <Text style = {styles.title}>{"Name:"}</Text>
      <TextInput
        style={[styles.inputContainer, {marginHorizontal: 15}]}
        placeholder='Name'
        onChangeText={setName}
        defaultValue={card.name}
      ></TextInput>
      <Text style = {styles.title}>{"Front:"}</Text>
      <TextInput
        style={[styles.inputContainer, {marginHorizontal: 15}]}
        placeholder='Front'
        onChangeText={setFront}
        defaultValue={card.front}
      ></TextInput>
      <Text style = {styles.title}>{"Back:"}</Text>
      <TextInput
        style={[styles.inputContainer, {marginHorizontal: 15}]}
        placeholder='Back'
        onChangeText={setBack}
        defaultValue={card.back}
      ></TextInput>
      <Button
        style = {[styles.button, {borderRadius: 0}]}
        onPress = {() => {
          card.setFields(name, front, back)
          router.back()
        }}
      >
        <Text style = {styles.headerTitle}>{"Save"}</Text>
      </Button>
      <Button
        style = {[styles.button, {borderRadius: 0}]}
        onPress = {async () => {
          await card.markAsDeleted()
          router.back()
        }}
      >
        <Text style = {styles.headerTitle}>{"Delete"}</Text>
      </Button>
    </View>
  )
}