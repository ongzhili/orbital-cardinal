import { View, Text, FlatList } from "react-native";
import { GuildContext } from "../../contexts/guild";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import { QuizContext } from "../../contexts/quiz";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/auth";
import styles from "../styles";




export function OptionRender({ item, setDeck, selected, onSelect, quiz }) {
  const router = useRouter();
  const handleDeckUpdate = () => {
    setDeck(item);
    onSelect(item);
    console.log(quiz);
  };

  const handleLBClick = () => {
    router.push("./Leaderboard");
  };

  const handleDeckPlayClick = () => {
    router.push("./GuildQuiz");
  };


  const renderDropdown = () => {
    if (item.title == quiz.title) {
      return (
        <View style={styles.dropdownContainer}>
          <Button 
            style = {[styles.button, {fontSize: 25}]} 
            onPress={() => handleLBClick()}
            labelStyle = {[styles.headerTitle, {color: 'white'}]}>
              Leaderboards
          </Button>
          <Button 
            style = {[styles.button, {fontSize: 25}]} 
            onPress={() => handleDeckPlayClick()}
            labelStyle = {[styles.headerTitle, {color: 'white'}]}>
              Play
          </Button>
        </View>
      );
    } else {
      return null;
    }
  };
  const buttonStyle = selected ? styles.buttonSelected : styles.button;

  // Render
  return (
    <View>
      <Button 
        style = {buttonStyle} 
        onPress={handleDeckUpdate}
        labelStyle ={[styles.headerTitle, {color: 'white'}]}>
          {item.title}
      </Button>

      {renderDropdown()}
    </View>
  );
}

// Default render
export default function CommunityQuiz() {
  // States and variahbles used in the function
  const [init, setInit] = useState(false);
  const currentGuild = useContext(GuildContext);
  const currentQuiz = useContext(QuizContext);
  const [guildquiz, setGuildquiz] = useState(null);
  const currentUser = useAuth();
  const router = useRouter();

  const handleSelect = (deck) => {
    currentQuiz.setQuiz(deck);
  };

  const handleGuildQuizzes = async () => {
    const { data, error } = await supabase
      .from('Decks')
      .select('*')
      .in('id', currentGuild.guild.quizzes);

    if (error) {
      console.log(error);
    }
    setGuildquiz(data);
  }

  // Route
  const goToAddDeck = () => {
    router.replace("./AddDeckSelect");
  }
    
  // Route
  const goToRemoveDeck = () => {
    router.replace("./RemoveDeckSelect");
  }

  // AddDeck renderer
  const renderAddDeck = () => {
    if (currentUser.user.id == currentGuild.guild.owner) {
      return (
        <Button 
          mode='contained'
          buttonColor="#2e2933"
          style={styles.quizContainer2}
          labelStyle={styles.quizButton}  
          onPress={goToAddDeck}>
            Add Deck
        </Button>
      )
    } else {
      return null;
    }
  }

  // RemoveDeck renderer
  const renderRemoveDeck = () => {
    if (currentUser.user.id == currentGuild.guild.owner) {
      return (
        <Button
          mode='contained'
          buttonColor="#2e2933"
          style={styles.quizContainer2}
          labelStyle={styles.quizButton}   
          onPress={goToRemoveDeck}>
            Remove Deck
        </Button>
      )
    } else {
      return null;
    }
  }

  // Initialization
  if (!init) {
    handleGuildQuizzes();
    setInit(true);
  }

  // Render
  return (
    <SafeAreaView style = {{flex: 1, backgroundColor: '#18171a'}}>
      <Text style = {styles.guildInfoContainerTitle}>
        Choose a Deck:
      </Text>
      <FlatList
        data={guildquiz}
          renderItem={({ item }) => <OptionRender item={item} setDeck={currentQuiz.setQuiz} selected = {item.title == currentQuiz.quiz.title} onSelect={handleSelect} quiz ={currentQuiz.quiz}/>}
      />
      {renderAddDeck()}
      {renderRemoveDeck()}
    </SafeAreaView>
  )
}
