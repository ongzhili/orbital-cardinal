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
    <View style={styles.mainMenuContainer2}>
      <Text style = {styles.guildInfoContainerTitle}>
        Enter Card info:
      </Text>
      <Text style = {styles.title}>{"Name:"}</Text>
      <TextInput
        style={[styles.inputContainer, {marginHorizontal: 15}]}
        placeholder='Name'
        onChangeText={setName}
      ></TextInput>
      <Text style = {styles.title}>{"Front:"}</Text>
      <TextInput
        style={[styles.inputContainer, {marginHorizontal: 15}]}
        placeholder='Front'
        onChangeText={setFront}
      ></TextInput>
      <Text style = {styles.title}>{"Back:"}</Text>
      <TextInput
        style = {[styles.inputContainer, {marginHorizontal: 15}]}
        placeholder='Back'
        onChangeText={setBack}
      ></TextInput>
      <Button
        style = {[styles.button, {borderRadius: 0}]}
        onPress = {() => {
          Card.makeCard(name, front, back)
          router.back()
        }}
      >
        <Text style = {styles.headerTitle}>{"Create Card"}</Text>
      </Button>
    </View>
  )
}