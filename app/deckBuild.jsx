/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';



const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    image: {
      flex: 1,
      width: 400,
      height: 400,
      resizeMode: 'stretch' ,
      padding: 100,
      marginVertical:20,
    }
  });



export default function deckBuild() {
    return (
      <View>
        <Image style = {styles.image} source = {require('../assets/adaptive-icon.png')}>
        </Image>
      </View>
    );
}