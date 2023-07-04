import { View, Text, StyleSheet, FlatList,} from "react-native";
import { Button } from "react-native-paper";
import { GuildContext } from "../../contexts/guild";
import { useContext, useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from '../../lib/supabase';

//TODO: Figure out the format

const SAMPLE_ACTIVITY = [
    {
        time: 'june 20th',
        activityType: 'Joined',
        userid: 1,
        
    },
    {
        time: 'june 21th',
        activityType: 'Completed Quiz',
        userid: 1,
        score: 8,
        quizid: 1
    },
    {
        time: 'june 22th',
        activityType: 'Completed Quiz',
        userid: 1,
        score: 9,
        quizid: 1
    },
    {
        time: 'june 23th',
        activityType: 'Joined',
        userid: 2,
    },
    {
        time: 'june 20th',
        activityType: 'Completed Quiz',
        userid: 1,
        score: 10,
        quizid: 1

    },
    {
        time: 'june 20th',
        activityType: 'Completed Quiz',
        userid: 2,
        score: 7,
        quizid: 1
    },
]


export function PostRender({ item }) {
    const date = new Date(item.created_at);
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
        <View style = {styles.description}>
            <Text>{display + " " + item.activity_type + " at " + date}</Text>
        </View>
      );
  }


export default function Community() {
    const currentGuild = useContext(GuildContext);
    const [recentactivity, setRecentactivity] = new useState();
    const [init, setInit] = new useState(false);
    const [owner, setOwner] = new useState('');
    console.log(currentGuild);

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
        console.log(data);
        setRecentactivity(data);
        
      
    }

    if (!init) {
        handleAllPosts(currentGuild.guild.Guild_ID);
        getOwnerName(currentGuild.guild.owner);
        setInit(true);
    }

    return (
        <SafeAreaView>
            <Text style = {styles.title}>
                {currentGuild.guild.title}
            </Text>
            <Text style = {styles.description}>
                {"created by: " + owner}
            </Text>
            <Text style = {styles.description}>
                {currentGuild.guild.description}
            </Text>
            <Link href = "./CommunityQuiz">
                <Button style = {styles.title}>
                    Community Quizzes
                </Button>
            </Link>
            <Text style = {styles.title}>
                Recent Activity
            </Text>
            <FlatList
            data={recentactivity}
            renderItem={({ item }) => (
              <PostRender item={item} />
            )}>
            </FlatList>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        textAlign: 'center',
        backgroundColor:'#D9D9D9',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 40,
    },
    description: {
        fontSize: 15,
        backgroundColor:'#D9D9D9',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 40,
  
      },
  });