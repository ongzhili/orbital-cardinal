/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link, Redirect, useRouter } from 'expo-router';
import { AuthContext, useProtectedRoute } from "../../contexts/auth";
import { useContext, useState} from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/auth';
import { supabase } from '../../lib/supabase';



const DATA = [
    {
      id: '1',
      title: 'Browse Communities',
      link: "./browseGuilds",
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

export const loadName = async ({user, setDisplayName}) => {
  const {data, error} = await supabase.from('Users').select('display_name', user.id).eq('user_id', user.id);

  if (error) {
    console.log(error);
  } else {
    console.log('no error!')
    console.log(data);
    setDisplayName(data[0]);

    // Seems to work without RLS, will need to experiment with RLS.
  }
}


export default function commHome() {
  const currentUser = useAuth();
  const [display, setDisplay] = new useState("");
  const [init, setInit] = new useState(false);
  

  if (!currentUser.user || currentUser.user == null) {
    console.log('dasdasd');
    return <Redirect href = "./login" />
  }

  const handleName = async () => {
    const {data, error} = await supabase
      .from('Users')
      .select('display_name', 'user_id')
      .eq('user_id', currentUser.user.id)
      .limit(1);
    if (error) {
        setErrMsg(error.message);
    }
    
    console.log(data);
    setDisplay(data[0].display_name);
  }

  if (!init) {

    handleName();
    setInit(true);
  }


  return (
    <View>
      <Image style = {styles.image} source = {require('../../assets/adaptive-icon.png')}>
      </Image>
      <Text>
        {"Welcome + " + display}
      </Text>
      <FlatList
      data = {DATA}
      renderItem = {({item}) => <Item item={item} />}
      >

      </FlatList>

    </View>
  );
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

 