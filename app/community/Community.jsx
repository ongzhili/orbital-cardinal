import { View, Text, StyleSheet, FlatList,} from "react-native";
import { Button } from "react-native-paper";
import { GuildContext } from "../../contexts/guild";
import { useContext, useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from '../../lib/supabase';
import { useAuth } from "../../contexts/auth";
import { useRouter } from "expo-router";
import { QuizContext } from "../../contexts/quiz";


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
    const currentUser = useAuth();
    const router = useRouter();
    


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
        setRecentactivity(data);
        
      
    }
    
    const handleDisband = () => {
        //TODO: Conditional rendering of this button for disbanding guild instead of leave for guild owner.
    }

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

    if (!init) {
        handleAllPosts(currentGuild.guild.Guild_ID);
        getOwnerName(currentGuild.guild.owner);
        setInit(true);
    }


    return (
        <SafeAreaView>
            <View>
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
            </View>
            <Button onPress = {() => handleLeave(currentUser.user.id, currentGuild.guild.Guild_ID)}>
                Leave Guild
            </Button>
            
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