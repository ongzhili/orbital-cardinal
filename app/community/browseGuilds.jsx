/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { Link, useRouter} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createContext, useContext, useEffect, useState } from "react";
import { GuildContext } from "../../contexts/guild";
import { useAuth } from '../../contexts/auth';
import { supabase } from '../../lib/supabase';
import styles from '../styles';


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

export function ChoiceRender({ item, setItem, selectedItem}) {

  const handleItemUpdate = () => {
    setItem(item);
  };

    return (
        <View style={item === selectedItem ? styles.buttonSelected : styles.button}>
          <Button onPress={handleItemUpdate}>
            <Text style={styles.title}>{item.title}</Text>
          </Button>
        </View>
      );
  }

  const DEFAULT_GUILD = {
    id: -1,
    title: 'None',
    description: '',
  }



  export function DropDown({guild}) {
    const router = useRouter();
    const [joined, setJoined] = new useState(false);
    const currentUser = useAuth();
    console.log('dropdown');
    console.log(guild);
    console.log(currentUser.user.id);

    const handleJoin = async () => {
      const { data, error } = await supabase
        .rpc('append_uuid_to_array', {
           userid: currentUser.user.id,
           guildid: guild.Guild_ID

        });

      if (error) {
        console.log(error);
      }
      setJoined(true);
      router.replace("./Community");
      
    
    }

    const handleGo = () => {
      router.push("./Community");
    }

    if (guild.users.includes(currentUser.user.id) || joined) {
      return (
        <Button mode="flat" buttonColor="#8f8f8f" labelStyle={styles.joinButton} onPress={handleGo}>
          Go
        </Button>
        )
    } else {
      return (
        <Button mode="flat" buttonColor="#8f8f8f" labelStyle={styles.joinButton} onPress={handleJoin}>
          Join
        </Button>
      )
    }

  }



  export default function GuildSelect() {
    const guildCont = useContext(GuildContext);
    const [selectedGuild, setSelectedGuild] = useState(DEFAULT_GUILD);
    const [dataToSend, setDataToSend] = useState([]);
    const [init, setInit] = new useState(false);
    const MAX_DESCRIPTION_LENGTH = 100;
  
    const handleGuildSelect = (guild) => {
      setSelectedGuild(guild);
    };
  
    useEffect(() => {
      guildCont.setGuild(selectedGuild);
    }, [selectedGuild]);

 
    const handleAllGuilds = async () => {
      const {data, error} = await supabase
        .from('Guilds')
        .select('*')
      if (error) {
          setErrMsg(error.message);
          console.log('error in obtaining guilds')
          console.log(error);
      } 
      setDataToSend(data);
      

    }
  
  if (!init) {
    handleAllGuilds();
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





