

const OPTIONS = [
    {
      id: '1',
      title: 'Classic',
      link: "play",
    },
    {
      id: '2',
      title: 'Quiz',
      link: "play",
    },
  ]
  
  function Item( {item} ) { 
    return (
        <View style = {styles.button}>
          <Link href= {item.link}>
            <Button style = {styles.button}>
                <Text style = {styles.title}>
                    {item.title}
                </Text>
            </Button>
          </Link>
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
      marginHorizontal: 40,
    },
    title: {
      textAlign: 'center',
      fontSize: 25,
      alignSelf: 'stretch',
      lineHeight: 30,
    },
    image: {
      flex: 1,
      width: 400,
      height: 400,
      resizeMode: 'stretch' ,
      padding: 100,
      marginVertical:20,
    }
  });

  export function playSelect() {
    const currentUser = useAuth();
    console.log(`StartingPage - ${currentUser}`);
    return (
      <View>
        <Image style = {styles.image} source = {require('../assets/adaptive-icon.png')}>
        </Image>
        <FlatList
        data = {DATA}
        renderItem = {({item}) => <Item item={item} />}
        keyExtractor={item => item.id}>

        </FlatList>

      </View>
    );
}