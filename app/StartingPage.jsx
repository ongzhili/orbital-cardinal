import { View } from 'react-native';
import { FlatList, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import styles from './styles';

// Array of button information to render.
const DATA = [
  {
    id: '1',
    title: 'Play',
    link: "./play/ModeSelect",
  },
  {
    id: '2',
    title: 'Create',
    link: "./edit/EditSelect",
  },
  {
    id: '3',
    title: 'Community',
    link: "./community/commHome",
  }
];

// Function used to render menu buttons
export function MenuRender({ item }) { 
  return (
    <View style = {styles.button}>
      <Link href= {item.link}>
        <Button>
          <Text style = {styles.selectionTitle}>
            {item.title}
          </Text>
        </Button>
      </Link>
    </View>
  )
}


// Render
export function StartingPage() {
  return (
    <View style = {styles.mainMenuContainer2}>
      <Image style = {styles.loginImage} source = {require('../assets/adaptive-icon.png')}>
      </Image>
      <FlatList
      data = {DATA}
      renderItem = {({item}) => <MenuRender item={item} />}
      keyExtractor={item => item.id}>
      </FlatList>
    </View>
  );
}

const testfunc = async () => {
  let decks = await database.get('decks').query().fetch()
  let deck = decks[0]
  let cards = await deck.getCards()
  cards = cards.map(card => {return {id: card.id, name: card.name, front: card.front, back: card.back, updated_at: card.updated_at}})
  let { data, error } = await supabase
    .rpc('upload_card_array', {
      cards: cards, 
      deckid: deck.id, 
      description: deck.description, 
      name: deck.name
    })
  
  if (error) console.error(error)
  else console.log(data)

}