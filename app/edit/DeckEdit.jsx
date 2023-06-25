/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { Link } from 'expo-router';
import { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlashCard from '../play/FlashCard';

export default function deckEdit() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)
    return (
      <SafeAreaView>
      <FlatList
      data = {currentDeck.deck}
      renderItem = {({item}) => <FlashCard flashCard={item} />}
      keyExtractor={item => item.id}>

      </FlatList>
      </SafeAreaView>

    );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginBottom: 20,
  },
  flashCard: {
    backgroundColor: '#825950',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    borderRadius: 30,
    justifyContent: 'space-around',
    height: 200,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 10,
  },
  });

