/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createContext, useContext, useEffect, useState } from "react";
import { GuildContext } from "../../contexts/guild";
import { column } from '@nozbe/watermelondb/QueryDescription';
import { useAuth } from '../../contexts/auth';
import { supabase } from '../../lib/supabase';
import styles from '../styles';
import { ChoiceRender, DropDown } from './browseGuilds';


const SAMPLE_GUILDS = [
    {
        id: 1,
        title: 'Sample Guild 1',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
    },
    {
        id: 2,
        title: 'Sample Guild 2',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
    },
    {
        id: 3,
        title: 'Sample Guild 3',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
    },
    {
      id: 4,
      title: 'Sample Guild 4',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
  },
    {
      id: 5,
      title: 'Sample Guild 5',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
  },
  {
    id: 6,
    title: 'Sample Guild 6',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
  },
  {
    id: 7,
    title: 'Sample Guild 7',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
  },
  {
    id: 8,
    title: 'Sample Guild 8',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
  },
  {
    id: 9,
    title: 'Sample Guild 9',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
  },
  {
    id: 10,
    title: 'Sample Guild 10',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
  },

]

// export function GuildRender({ item, setGuild, selectedGuild}) {

//     const handleGuildUpdate = () => {
//       setGuild(item);
//     };
  
//     return (
//         <View style={item === selectedGuild ? styles.buttonSelected : styles.button}>
//           <Button onPress={handleGuildUpdate}>
//             <Text style={styles.title}>{item.title}</Text>
//           </Button>
//         </View>
//       );
//   }

  const DEFAULT_GUILD = {
    id: -1,
    title: 'None',
    description: '',
  }



  export default function GuildSelect({ guild }) {
    const currentUser = useAuth();
    const guildCont = useContext(GuildContext);
    const [selectedGuild, setSelectedGuild] = useState(DEFAULT_GUILD);
    const [supaGuilds, setSupaGuilds] = useState(null);
    const [dataToSend, setDataToSend] = useState([]);
    const [init, setInit] = new useState(false);
    const MAX_DESCRIPTION_LENGTH = 100;
  
    const handleGuildSelect = (guild) => {
      setSelectedGuild(guild);
    };
  
    useEffect(() => {
      guildCont.setGuild(selectedGuild);
    }, [selectedGuild]);




    const fetchGuilds = async (guildid, setDataToSend) => {
      const {data, error} = await supabase
        .from('Guilds')
        .select()
        .eq('Guild_ID', guildid)
        .limit(1);
      if (error) {
          console.log(error.message);
      }
      if (data[0] !== undefined) {
        console.log(data[0].title);
        console.log(data[0].description);
        setDataToSend((result) => [...result, data[0]]);
      }
      
    }


    
    const handleGuilds = async () => {
      const {data, error} = await supabase
        .from('Users')
        .select('Guilds', 'user_id')
        .eq('user_id', currentUser.user.id)
        .limit(1);
      if (error) {
          setErrMsg(error.message);
          console.log(error);
      }
      
      console.log(data[0].Guilds);
      setSupaGuilds(data[0].Guilds);

      for (const guildId of data[0].Guilds) {
        console.log(guildId);
        await fetchGuilds(guildId, setDataToSend);
      }

       
    }
  
  if (!init) {

    handleGuilds();
    setInit(true);
  }
  
  return (
    <SafeAreaView style={{ flexDirection: 'column', flex: 1}}>

      
      <View style={styles.listHeader}>
            <Text style={styles.selectionTitle}>{"Selected Guild: " + selectedGuild.title}</Text>
            <Text style={styles.selectionDesc}>{selectedGuild.description.length > MAX_DESCRIPTION_LENGTH
              ? selectedGuild.description.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
              : selectedGuild.description}
            </Text>
       <View style={styles.bottomButtonContainer}>
            {selectedGuild.id !== -1 && (
              <DropDown guild = {selectedGuild}></DropDown>

            )}
       </View> 
      </View>
      <ScrollView style = {{flex: 1}}>
      <View>
        <FlatList
        style={{}}
        data={dataToSend}
        renderItem={({ item }) => (
          <ChoiceRender item={item} setItem={handleGuildSelect} selectedItem={selectedGuild} />
        )}
        keyExtractor={(item) => item.title}
      />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}




