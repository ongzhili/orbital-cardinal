/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';



const DATA = [
    {
      id: '1',
      title: 'Play',
    },
    {
      id: '2',
      title: 'Community',
    },
    {
      id: '3',
      title: 'Settings',
    },
  ];

function Item( {title} ) {
    return (
        <View style = {styles.button}>
            <Button style = {styles.button}
            onPress = {() => 1}>
                <Text style = {styles.title}>
                    {title}
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



export function StartingPage() {
    return (
      <View>
        <Image style = {styles.image} source = {require('../assets/adaptive-icon.png')}>
        </Image>
        <FlatList
        data = {DATA}
        renderItem = {({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}>

        </FlatList>
      </View>
    );
}