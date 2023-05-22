import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, Button, TextInput, Checkbox } from 'react-native-paper';



const DATA = [
    {
      id: '1',
      title: 'Play',
    },
    {
      id: '2',
      title: 'Community',
    },
    {
      id: '3',
      title: 'Settings',
    },
  ];

function Item( {title} ) {
    return (
        <View style = {styles.button}>
            <Button style = {styles.button}
            onPress = {() => 1}>
                <Text style = {styles.title}>
                    {title}
                </Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    button: {
      backgroundColor: '#D9D9D9',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      textAlign: 'center',
      fontSize: 25,
      alignSelf: 'stretch',
      lineHeight: 30,
    },
  });



export function StartingPage() {
    return (
        <FlatList
        data = {DATA}
        renderItem = {({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}>

        </FlatList>

    );
}