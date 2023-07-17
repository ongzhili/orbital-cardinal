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

const SAMPLE_DECKS = [
    {
        title: "Deck 1",
        deck :[
            {
                title: '1',
                front: 'What is 1 + 1',
                back: '2',
              },
              {
                title: '2',
                front: 'deck1q2',
                back: '4',
              },
        ]
    },
    {
        title: "Deck 2",
        deck :[
            {
              title: '1',
                front: 'deck2q1',
                back: '1',
              },
              {
                title: '2',
                front: 'deck2q2',
                back: '4',
              },
        ]
    },

];

const DEFAULT_DECK = [
    {
        title: "edrtyuhedrtuhj",
        description: "",
        deck: {},
    }
]



export function OptionRender({ item, setDeck, selected, onSelect, quiz }) {
    const router = useRouter();
    const handleDeckUpdate = () => {
      setDeck(item);
      onSelect(item);
      console.log(quiz);
    };
  
    const handleLBClick = () => {
      router.replace("./Leaderboard");
    };
  
    const handleDeckPlayClick = () => {
      router.push("./GuildQuiz");
    };

  
    const renderDropdown = () => {
      if (item.title == quiz.title) {
        return (
          <View style={styles.dropdownContainer}>
            <Button style = {styles.button} onPress={() => handleLBClick()}>
              <Text style = {styles.title}>Leaderboards</Text>
            </Button>
            <Button style = {styles.button} onPress={() => handleDeckPlayClick()}>
              <Text style = {styles.title}>Play</Text>
            </Button>
          </View>
        );
      } else {
        return null;
      }
    };
    const buttonStyle = selected ? styles.buttonSelected : styles.button;
    return (
      <View>
        <Button style = {buttonStyle} onPress={handleDeckUpdate}>
          <Text style = {styles.title}>{item.title}</Text>
        </Button>
  
        {renderDropdown()}
      </View>
    );
  }


export default function CommunityQuiz() {
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

    const goToAddDeck = () => {
      router.replace("./AddDeckSelect");

    }

    const renderAddDeck = () => {
      if (currentUser.user.id == currentGuild.guild.owner) {
        return (
          <Button onPress={goToAddDeck}>
            <Text>
              Add Deck
            </Text>
          </Button>
        )
      } else {
        return null;
      }
    }
    if (!init) {
      handleGuildQuizzes();
      //console.log(currentQuiz.quiz.title);
      setInit(true);
    }
    return (
        <SafeAreaView>
            <Text>
                asdasdasdas
            </Text>
        <FlatList
          data={guildquiz}
            renderItem={({ item }) => <OptionRender item={item} setDeck={currentQuiz.setQuiz} selected = {item.title == currentQuiz.quiz.title} onSelect={handleSelect} quiz ={currentQuiz.quiz}/>}
        />
        {renderAddDeck()}
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    button: {
        backgroundColor:'#D9D9D9',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 40,
        fontSize: 25,
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
      color: 'white'
    },
    image: {
      flex: 1,
      width: 400,
      height: 400,
      resizeMode: 'stretch' ,
      padding: 100,
      marginVertical:20,
    },
    dropdownContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 5,
        marginBottom: 5,
      },
    
      buttonContainer: {
        flexDirection: 'row',
      },
  });