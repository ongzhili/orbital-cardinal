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
import { supabase, getSesh, getUser } from '../../lib/supabase';



const PAGES = [
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
    {
      id: '3',
      title: 'User Settings',
      link: "./userSettings",
    },
    {
      id: '4',
      title: 'Create a Community',
      link: "./CreateGuild",
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


export default function commHome() {
  const currentUser = useAuth();
  console.log(currentUser);
  const [display, setDisplay] = new useState("");
  const [init, setInit] = new useState(false);
  const [errMsg, setErrMsg] = useState('');
  const router = useRouter();
  
  if (!currentUser.user) {
    console.log('Not Logged in! (from commHome)');
    //router.replace("./login");
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
    
    //console.log(data);
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
        {"Logged in as: " + display}
      </Text>
      <FlatList
      data = {PAGES}
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

 