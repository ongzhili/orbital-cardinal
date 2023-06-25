import { View, Text, FlatList } from "react-native";
import { GuildContext } from "../../contexts/guild";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';

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
        title: "",
        deck: {},
    }
]

export function OptionRender({ item, setDeck, selected, onSelect }) {
    const handleDeckUpdate = () => {
      setDeck(item.deck);
      onSelect(item.title);
      console.log(item.title);
    };
  
    const handleLBClick = () => {
      //TODO: Go to leaderboard, make leaderboard page
    };
  
    const handleDeckPlayClick = () => {
      //TODO: Go to modified deckplay, that submits score after completion
    };
  
    const renderDropdown = () => {
      if (selected) {
        return (
          <View style={styles.dropdownContainer}>
            <Button style = {styles.button} onPress={handleLBClick}>
              <Text style = {styles.title}>Leaderboards</Text>
            </Button>
            <Button style = {styles.button} onPress={handleDeckPlayClick}>
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
    const currentGuild = useContext(GuildContext);
    const [deck, setDeck] = useState(DEFAULT_DECK);
    const [selectedDeck, setSelectedDeck] = useState(null);

    const handleSelect = (deck) => {
        setSelectedDeck(deck);
    };

    //TODO: async function to get quizzes that matches guild ID.
    // shd be sth like to get guild quiz IDs:
    // let quizzes = currentGuild.Quizzes()
    // shd just be sth like supabase.from('Decks').select().in('id', quizzes)

    console.log(SAMPLE_DECKS);
    return (
        <SafeAreaView>
            <Text>
                asdasdasdas
            </Text>
        <FlatList
          data={SAMPLE_DECKS}
            renderItem={({ item }) => <OptionRender item={item} setDeck={setDeck} selected = {item.title ==selectedDeck} onSelect={handleSelect}/>}
        />
            <Text>asdasdsa</Text>
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