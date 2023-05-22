import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, Button, TextInput, Checkbox } from 'react-native-paper';
import { StartingPage } from './components/StartingPage'

export default function App() {
  return (
    <SafeAreaProvider >
      <SafeAreaView style = {styles.container}>
        <StartingPage />
      </SafeAreaView>
    </SafeAreaProvider >
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
