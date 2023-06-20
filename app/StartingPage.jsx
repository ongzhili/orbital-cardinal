/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { useAuth } from '../contexts/auth';



const DATA = [
    {
      id: '1',
      title: 'Play',
      link: "play",
    },
    {
      id: '2',
      title: 'Community',
      link: "./community/commHome",
    },
    {
      id: '3',
      title: 'Settings',
      link: "settings",
    },
  ];

function Item( {item} ) { 
    return (
        <View style = {styles.button}>
          <Link href= {item.link}>
            <Button style = {styles.button}>
                <Text style = {styles.title}>
                    {item.title}
                </Text>
            </Button>
          </Link>
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



export function StartingPage() {
    const currentUser = useAuth();
    console.log(currentUser);
    return (
      <View>
        <Image style = {styles.image} source = {require('../assets/adaptive-icon.png')}>
        </Image>
        <FlatList
        data = {DATA}
        renderItem = {({item}) => <Item item={item} />}
        keyExtractor={item => item.id}>

        </FlatList>

      </View>
    );
}