import { View, Text, StyleSheet, FlatList,} from "react-native";
import { Button } from "react-native-paper";
import { GuildContext } from "../../contexts/guild";
import { useContext } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

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

  
    return (
        <View style = {styles.description}>
            <Text>{item.userid + " " + item.activityType + " at " + item.time}</Text>
        </View>
      );
  }


export default function Community() {
    const currentGuild = useContext(GuildContext);
    console.log(currentGuild);

    return (
        <SafeAreaView>
            <Text style = {styles.title}>
                {currentGuild.guild.title}
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
            data={SAMPLE_ACTIVITY}
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