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
import { Card } from '../../lib/model';

export default function CardBuild() {
  const [name, setName] = useState("")
  const [front, setFront] = useState("")
  const [back, setBack] = useState("")
  const router = useRouter()

  return (
    <ScrollView>
      <Text style = {styles.title}>{"Name:"}</Text>
      <TextInput
      placeholder='Name'
      onChangeText={setName}
      ></TextInput>
      <Text style = {styles.title}>{"Front:"}</Text>
      <TextInput
      placeholder='Front'
      onChangeText={setFront}
      ></TextInput>
      <Text style = {styles.title}>{"Back:"}</Text>
      <TextInput
      placeholder='Back'
      onChangeText={setBack}
      ></TextInput>
      <Button
      style = {styles.button}
      onPress = {() => {
        Card.makeCard(name, front, back)
        router.back()
      }}
      >
        <Text style = {styles.title}>{"Create"}</Text>
      </Button>
    </ScrollView>
  )
}