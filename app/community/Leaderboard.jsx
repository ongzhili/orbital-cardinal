import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QuizContext } from '../../contexts/quiz';
import { GuildContext } from '../../contexts/guild';
import { supabase } from '../../lib/supabase';


export default function Leaderboard() {
    const [init, setInit] = useState(false);
    const [score, setScores] = useState([]);
    const currentQuiz = useContext(QuizContext);
    const currentGuild = useContext(GuildContext);

    const getAllScores = async () => {
        const { data, error } = await supabase
        .from('Scores')
        .select('*')
        .eq('quiz_id', currentQuiz.quiz.id)
        .eq('guild_id', currentGuild.guild.Guild_ID);

        if (error) {
            console.log(error);
        }
        console.log(data);
        setScores(data);
      

    }
    if (!init) {
        getAllScores();
        setInit(true);
    }

    //TODO: Convert all the userids into username.


    const renderItem = ({ item }) => {
        
        return (
        <View style={styles.item}>
            <View style={styles.column}>
            <Text style={styles.value}>{item.user_id}</Text>
            <Text style={styles.value}>{item.score}</Text>
            </View>
        </View>);
    }
  
    return (
      <SafeAreaView>
        <View style={styles.headerContainer}>
            <View style={styles.column}>
                <Text style={styles.header}>User</Text>
                <Text style={styles.header}>Score</Text>
            </View>
        </View>
        <View style={styles.container}>
          <FlatList
            data={score}
            renderItem={renderItem}
          />
        </View>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    item: {
      marginBottom: 8,
    },
    column: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    value: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    container: {
        paddingHorizontal: 50,
    },
    headerContainer: {

        paddingHorizontal: 50,
    }
  });
