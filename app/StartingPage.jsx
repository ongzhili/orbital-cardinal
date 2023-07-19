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
  },
  {
    id: '4',
    title: 'For Joe',
    link: "./BrowseDecks",
  },
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
