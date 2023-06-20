/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link, Redirect, useRouter } from 'expo-router';
import { AuthContext, useProtectedRoute } from "../../contexts/auth";
import { useContext } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/auth';
import { supabase } from '../../lib/supabase';


const DATA = [
    {
      id: '1',
      title: 'Browse Decks',
      link: "./deck/deckSelect",
    },
    {
      id: '2',
      title: 'My Communities',
      link: "./myGuilds",
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



export function HomeIfLoggedIn({user}) {

    if (!user) {
      return <Redirect href = "./login" />
    }
  
    return (
      <View>
        <Image style = {styles.image} source = {require('../../assets/adaptive-icon.png')}>
        </Image>
        <FlatList
        data = {DATA}
        renderItem = {({item}) => <Item item={item} />}
        keyExtractor={item => item.id}>

        </FlatList>

      </View>
    );
}

export const loadName = async (user) => {
  const {data, error} = await supabase.from('Users').select('Display_Name', user.id);

  if (error) {
    console.log(error);
  } else {
    console.log('no error!')
    console.log(data);

    // Seems to work without RLS, will need to experiment with RLS.
  }
}

export default function commHome() {
  const currentUser = useAuth();
  console.log(currentUser.user);

  loadName(currentUser);



  return (
    <HomeIfLoggedIn user={currentUser.user} />
  );
}