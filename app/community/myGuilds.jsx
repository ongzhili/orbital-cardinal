import { FlatList, Image, ScrollView , View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext, useEffect, useState } from "react";
import { GuildContext } from "../../contexts/guild";
import { useAuth } from '../../contexts/auth';
import { supabase } from '../../lib/supabase';
import styles from '../styles';
import { ChoiceRender, DropDown } from './browseGuilds';

// Default guild (again, used for id = -1 mainly.)
const DEFAULT_GUILD = {
  id: -1,
  title: 'None',
  description: '',
}


// Function to render selection
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
      setDataToSend((result) => [...result, data[0]]);
    }
}

  // Handles fetching of guilds.
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
      await fetchGuilds(guildId, setDataToSend);
    }
  }

  // Initialization
  if (!init) {
    handleGuilds();
    setInit(true);
  }
  
  // Render
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




