import { View, Text, StyleSheet, FlatList, ScrollView,} from "react-native";
import { Button } from "react-native-paper";
import { GuildContext } from "../../contexts/guild";
import { useContext, useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from '../../lib/supabase';
import { useAuth } from "../../contexts/auth";
import { useRouter } from "expo-router";
import styles from "../styles";

// Function to render each activity.
export function PostRender({ item }) {
  const date = new Date(item.created_at).toString().slice(0, 24)
  const [display, setDisplay] = new useState('');

  const handleName = async () => {
      const {data, error} = await supabase
        .from('Users')
        .select('display_name', 'user_id')
        .eq('user_id', item.user_id)
        .limit(1);
      if (error) {
          setErrMsg(error.message);
      }
      setDisplay(data[0].display_name);
  }
  handleName();

  return (
    <View style = {styles.guildInfoDescription}>
      <Text style = {{color: 'white'}}>{display + " " + item.activity_type + " at " + date}</Text>
    </View>
    );
  }

// Renders leave or disband depending if you arte the owner or not.
export function LeaveOrDisband({userid, guildid, ownerid}) {
  const router = useRouter();

  // Handles a user leaving the guild.
  const handleLeave = async (userid, guildid) => {
    const { data, error } = await supabase
      .rpc('leave_guild', {
        userid: userid,
        guildid: guildid
      });
    if (error) {
      console.log(error);
    } else {
      router.replace("./commHome")
    }
  }

  // Handles a user (owner) disbanding the guild.
  const handleDisband = async (userid, guildid) => {
    const { data, error } = await supabase
      .rpc('disband_guild', {
        guildid: guildid
    });
    if (error) {
      console.log(error);
    } else {
      router.replace("./commHome")
    }
  }
    
  // Conditional rendering (if you are owner or not the owner.)
  if (userid == ownerid) {
    return (
      <Button
        mode='contained'
        buttonColor="#2e2933"
        style={styles.quizContainer}
        labelStyle={styles.quizButton}  
        onPress = {() => handleDisband(userid, guildid)}>
          Disband Guild
      </Button>
    );
  } else {
    return (
      <Button
        mode='contained'
        buttonColor="#2e2933"
        style={styles.quizContainer}
        labelStyle={styles.quizButton}  
        onPress = {() => handleLeave(userid, guildid)}>
          Leave Guild
      </Button>
    );
  }
}

// Default render
export default function Community() {
  // States and bariables used.
  const currentGuild = useContext(GuildContext);
  const [recentactivity, setRecentactivity] = new useState();
  const [init, setInit] = new useState(false);
  const [owner, setOwner] = new useState('');
  const currentUser = useAuth();
  const router = useRouter();
  
  // Refreshes guild everytime this page is visited. (To properly reflect add/remove quizzes.)
  const refreshGuild = async () => {
    console.log("refreshGuild called")
    let { data, error } = await supabase
      .from('Guilds')
      .select("*")
      .eq('Guild_ID', currentGuild.guild.Guild_ID)
    if (error) {
      console.log(error)
    } else {
      console.log(data);
      currentGuild.setGuild(data[0]);
    }
  }

  // Gets owner name (for display)
  const getOwnerName = async (ownerid) => {
    const {data, error} = await supabase
      .from('Users')
      .select('display_name', 'user_id')
      .eq('user_id', ownerid)
      .limit(1);
    if (error) {
      setErrMsg(error.message);
      console.log('error in obtaining ownername')
      console.log(error);
    }
    setOwner(data[0].display_name);
  }

  // Fetches all activity data of this guild.
  const handleAllPosts = async (guildid) => {
    const {data, error} = await supabase
      .from('Activity')
      .select('*')
      .eq('guild', guildid)
    if (error) {
      setErrMsg(error.message);
      console.log('error in obtaining posts')
      console.log(error);
    } 
    setRecentactivity(data);
  }
  
  // Logic to handle user leaving the guild.
  const handleLeave = async (userid, guildid) => {
    const { data, error } = await supabase
      .rpc('leave_guild', {
        userid: userid,
        guildid: guildid
      });

    if (error) {
      console.log(error);
    }
    router.replace("./commHome")
  }

  const gotoQuiz = () => {
    router.push("./CommunityQuiz")
  }

  // Initialization.
  if (!init) {
    refreshGuild();
    handleAllPosts(currentGuild.guild.Guild_ID);
    getOwnerName(currentGuild.guild.owner);
    setInit(true);
  }

  // Render
  return (
    <SafeAreaView style = {{flex: 1, backgroundColor: '#18171a'}}>
      <ScrollView>
        <Text style = {styles.guildInfoContainerTitle}>
          {currentGuild.guild.title}
        </Text>
        <Text style = {styles.guildInfoDescription}>
          {"created by: " + owner}
        </Text>
        <Text style = {styles.guildInfoDescription}>
          {currentGuild.guild.description}
        </Text>
          <Button
            mode='contained'
            style = {styles.quizContainer}
            labelStyle = {styles.quizButton}
            onPress = {gotoQuiz}>
              Community Quizzes
          </Button>
        <Text style = {styles.guildInfoContainerTitle}>
          Recent Activity
        </Text>
        <FlatList
          data={recentactivity}
          renderItem={({ item }) => (
          <PostRender item={item} />
        )}>
        </FlatList>
        <LeaveOrDisband userid = {currentUser.user.id} guildid={currentGuild.guild.Guild_ID} ownerid={currentGuild.guild.owner}/>
      </ScrollView>
    </SafeAreaView>
  )
}