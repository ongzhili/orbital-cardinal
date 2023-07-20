import { View } from 'react-native';
import { FlatList, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRouter} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext, useEffect, useState } from "react";
import { GuildContext } from "../../contexts/guild";
import { useAuth } from '../../contexts/auth';
import { supabase } from '../../lib/supabase';
import styles from '../styles';

// Default Guild (mainly used for id: -1)
const DEFAULT_GUILD = {
  id: -1,
  title: 'None',
  description: '',
}

// Function to render choices.
export function ChoiceRender({ item, setItem, selectedItem}) {

  // Sets item when selected.
  const handleItemUpdate = () => {
    setItem(item);
  };

  // Render
  return (
    <View style={item === selectedItem ? styles.buttonSelected : styles.button}>
      <Button onPress={handleItemUpdate}>
        <Text style={styles.title}>{item.title}</Text>
      </Button>
    </View>
  );
}

export function DropDown({guild}) {
  // States and variables used in the function.
  const router = useRouter();
  const [joined, setJoined] = new useState(false);
  const currentUser = useAuth();

  // Handles the joining of a guild.
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
  // Handles going into a community (if the person has joined already)
  const handleGo = () => {
    router.push("./Community");
  }

  // Conditionally renders Join or Go, whether the user has joined a community already.
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
  // States and variables used in the function.
  const guildCont = useContext(GuildContext);
  const [selectedGuild, setSelectedGuild] = useState(DEFAULT_GUILD);
  const [dataToSend, setDataToSend] = useState([]);
  const [init, setInit] = new useState(false);
  const MAX_DESCRIPTION_LENGTH = 100;

  // Handles joining of a guild.
  const handleGuildSelect = (guild) => {
    setSelectedGuild(guild);
  };

  useEffect(() => {
    guildCont.setGuild(selectedGuild);
  }, [selectedGuild]);

  // Handles fetching of all guilds available.
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
  
  // Initialization
  if (!init) {
    handleAllGuilds();
    setInit(true);
  }

  // Render
  return (
    <SafeAreaView style = {{flex: 1, backgroundColor: '#18171a', flexDirection: 'column'}}>
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





