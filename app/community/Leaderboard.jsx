import React, { useContext, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QuizContext } from '../../contexts/quiz';
import { GuildContext } from '../../contexts/guild';
import { supabase } from '../../lib/supabase';
import styles from '../styles';

// Default render
export default function Leaderboard() {
  const [init, setInit] = useState(false);
  const [score, setScores] = useState([]);
  const currentQuiz = useContext(QuizContext);
  const currentGuild = useContext(GuildContext);

  // Fetches all scores
  const getAllScores = async () => {
    const { data, error } = await supabase
      .rpc('fetch_scores', {
        guildid: currentGuild.guild.Guild_ID, 
        quizid: currentQuiz.quiz.id
    })

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

  // Renders score
  const renderItem = ({ item }) => {
    return (
      <View style={styles.score}>
        <View style={styles.column}>
          <Text style={styles.scoreText}>{item.display_name}</Text>
          <Text style={styles.scoreText}>{item.score}</Text>
        </View>
      </View>);
  }
  
  return (
    <SafeAreaView>
      <View style={styles.leaderboardPaddingHeader}>
        <View style={styles.column}>
          <Text style={styles.scoreHeader}>User</Text>
          <Text style={styles.scoreHeader}>Score</Text>
        </View>
      </View>
      <View style={styles.leaderboardPadding}>
        <FlatList
          data={score}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}

