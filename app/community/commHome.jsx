import { FlatList, Image, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Redirect, useRouter } from 'expo-router';
import { useState} from 'react';
import { useAuth } from '../../contexts/auth';
import { supabase} from '../../lib/supabase';
import { MenuRender } from '../StartingPage';
import styles from '../styles';

// Data for pages and their respective destinations.
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

// Default render function
export default function commHome() {
  // States and variables used in the commHome function.
  const currentUser = useAuth();
  const [display, setDisplay] = new useState("");
  const [init, setInit] = new useState(false);
  const [errMsg, setErrMsg] = useState('');
  const router = useRouter();
  
  // Redirects to login if not logged in.
  if (!currentUser.user) {
    console.log('Not Logged in! (from commHome)');
    return <Redirect href = "./login" />
  }

  // Obtains display name of current user
  const handleName = async () => {
    const {data, error} = await supabase
      .from('Users')
      .select('display_name', 'user_id')
      .eq('user_id', currentUser.user.id)
      .limit(1);
    if (error) {
      setErrMsg(error.message);
    }
    setDisplay(data[0].display_name);
  }

  // Initialization.
  if (!init) {
    handleName();
    setInit(true);
  }

  // Render
  return (
    <View style = {{flex: 1, backgroundColor: '#18171a'}}>
      <Image style = {styles.loginImage} source = {require('../../assets/adaptive-icon.png')}>
      </Image>
      <Text style ={[styles.selectionTitle, {fontFamily: 'sans-serif-medium', marginBottom: 20}]}>
        {"Welcome to CARDinal, " + display + " !"}
      </Text>
      <FlatList
      data = {PAGES}
      renderItem = {({item}) => <MenuRender item={item} />}
      />
    </View>
  );
}


 