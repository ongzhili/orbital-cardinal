/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, Button, TextInput, Checkbox } from 'react-native-paper';
import { StartingPage } from './StartingPage'
import { supabase, getSesh } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomePage() {
  return (
      <SafeAreaView style = {styles.container}>
        <StartingPage />
      </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#454545',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
