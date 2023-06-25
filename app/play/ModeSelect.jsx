import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { PlayContext } from '../../contexts/play';
import { useContext } from 'react';
import { useRouter } from "expo-router";

const OPTIONS = [
    {
      id: 0,
      title: 'Review',
      link: "./DeckSelect",
    },
    {
      id: 1,
      title: 'Quiz',
      link: "./DeckSelect",
    },
  ]
  
  function Item( {item, onPress, router} ) { 

    return (
        <View style = {styles.button}>
          <Button 
          style = {styles.button}
          onPress = {() => {
            console.log(`ModeSelect - ${item.title}`)
            onPress(item.title)
            router.push(item.link)
          }}
          >
              <Text style = {styles.title}>
                  {item.title}
              </Text>
          </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    button: {
      backgroundColor: '#D9D9D9',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 40,
    },
    title: {
      textAlign: 'center',
      fontSize: 25,
      alignSelf: 'stretch',
      lineHeight: 30,
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

  export default function ModeSelect() {
    const playCont = useContext(PlayContext)
    const router = useRouter()

    return (
      <View>
        <FlatList
        data = {OPTIONS}
        renderItem = {({item}) => 
          <Item 
          item = {item} 
          onPress = {playCont.setMode}
          router = {router}
          />}
        keyExtractor={item => item.id}>

        </FlatList>

      </View>
    );
}