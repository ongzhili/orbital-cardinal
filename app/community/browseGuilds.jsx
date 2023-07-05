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

export function GuildRender({ item, setGuild, selectedGuild}) {

  const handleGuildUpdate = () => {
    setGuild(item);
  };

    return (
        <View style={item === selectedGuild ? styles.buttonSelected : styles.button}>
          <Button onPress={handleGuildUpdate}>
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

    if (guild.users.includes(currentUser.user.id) || joined) {
      return (
        <Link href="./Community">
          <Button style={{ textAlign: 'center', textColor: 'red' }}>
            Go
          </Button>
        </Link>
        )
    } else {
      return (
        <Button onPress={handleJoin}>
          Join
        </Button>
      )
    }


    //TODO: Change Join to Go once joined.
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
      console.log(data[0]);
      setDataToSend(data);
      

    }
  
  if (!init) {
    handleAllGuilds();
    setInit(true);
  }

  
    return (
      <SafeAreaView style={{ flexDirection: 'column' }}>
        <View style={styles.button2}>
              <Text style={styles.title}>{"Selected Guild: " + selectedGuild.title}</Text>
              <Text style={styles.desc}>{selectedGuild.description.length > MAX_DESCRIPTION_LENGTH
                ? selectedGuild.description.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
                : selectedGuild.description}
              </Text>
              {selectedGuild.id !== -1 && (
                <DropDown guild = {selectedGuild}></DropDown>
      )}
        </View>
          <FlatList
          style={{}}
          data={dataToSend}
          renderItem={({ item }) => (
            <GuildRender item={item} setGuild={handleGuildSelect} selectedGuild={selectedGuild} />
          )}
          keyExtractor={(item) => item.title}
        />
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    button: {
      backgroundColor:'#D9D9D9',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 40,

    },
    button2: {
      backgroundColor:'#D9D9D9',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 40,
      

    },
      buttonSelected: {
        backgroundColor:'red',
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
      desc: {
        textAlign: 'center',
        fontSize: 15,
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



