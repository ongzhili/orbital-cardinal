/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createContext, useContext, useEffect, useState } from "react";
import { GuildContext } from "../../../contexts/guild";
import { column } from '@nozbe/watermelondb/QueryDescription';


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



  export default function GuildSelect({ guild }) {
    const guildCont = useContext(GuildContext);
    const [selectedGuild, setSelectedGuild] = useState(DEFAULT_GUILD);
  
    const handleGuildSelect = (guild) => {
      setSelectedGuild(guild);
    };
  
    useEffect(() => {
      guildCont.setGuild(selectedGuild);
    }, [selectedGuild]);
  
    return (
      <SafeAreaView style={{ flexDirection: 'column' }}>
        <View style={styles.button2}>
              <Text style={styles.title}>{"Selected Guild: " + selectedGuild.title}</Text>
              <Text style={styles.desc}>{selectedGuild.description}</Text>
              {selectedGuild.id !== -1 && ( // Conditionally render the button if the guild id is not -1
              <Link href="./Community">
                <Button style={{ textAlign: 'center', textColor: 'red' }}>
                  Go
                </Button>
              </Link>
      )}
        </View>
  
        {/* TODO: Supabase integration to obtain list of guilds from a user */}
  
        <FlatList
          style={{}}
          data={SAMPLE_GUILDS}
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



