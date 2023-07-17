import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')

export default styles = StyleSheet.create({
    container: {
      flex:1,
      marginBottom: 20,
    },
    cardFace: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardText: {
      fontSize: 20,
      marginBottom: 20,
      marginTop: 20,
      alignSelf: 'center',
      color: '#FFFFFF'
    },
    title: {
      fontSize: 20,
      marginBottom: 20,
      marginTop: 20,
      alignSelf: 'center',
    },
    input: {
      marginBottom: 10,
    },
    card: {
      backgroundColor: '#03254c',
      justifyContent: 'center',
      alignItems: 'center',
      shadowOpacity: 0.5,
      shadowOffset: {
        height: 5,
        width: 5,
      },
      width: width - 20,
      height: height - 200,
      marginTop: 5,
      marginLeft: 10,
      marginRight: 10,
      borderWidth: 0,
      flex: 1,
    },
    cardCorrect: {
      backgroundColor: '#3CB043',
      justifyContent: 'center',
      alignItems: 'center',
      shadowOpacity: 0.5,
      shadowOffset: {
        height: 5,
        width: 5,
      },
      width: width - 20,
      height: height - 200,
      marginTop: 5,
      marginLeft: 10,
      marginRight: 10,
      borderWidth: 0,
      flex: 1,
    },
    cardWrong: {
      backgroundColor: '#FF0033',
      justifyContent: 'center',
      alignItems: 'center',
      shadowOpacity: 0.5,
      shadowOffset: {
        height: 5,
        width: 5,
      },
      width: width - 20,
      height: height - 200,
      marginTop: 5,
      marginLeft: 10,
      marginRight: 10,
      borderWidth: 0,
      flex: 1,
    },
    button: {
      backgroundColor: '#D9D9D9',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 40,
    },
    buttonContainer: {
      alignSelf: 'flex-end',
      alignItems: 'center',
      margin: 10,
    },
    buttonSelected: {
      backgroundColor:'red',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 40,
    },

    listHeader: {
      backgroundColor:'#D9D9D9',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 40,
      flex : 0.35
    },
    headerTitle: {
      textAlign: 'center',
      fontSize: 25,
      alignSelf: 'stretch',
      lineHeight: 30,
    },
    headerDesc: {
      textAlign: 'center',
      fontSize: 15,
      alignSelf: 'stretch',
      lineHeight: 30,
    },
    logo: {
      flex: 1,
      width: 400,
      height: 400,
      resizeMode: 'stretch' ,
      padding: 100,
      marginVertical:20,
    },
    joinButton: {
      color: '#D9D9D9',
      fontSize: 20,

    },
    bottomButtonContainer: {
      position: "absolute",
      bottom: 0,
      left: 9,
      width: "100%",
      padding: 10,
      backgroundColor: '#D9D9D9',
    },
    selectionTitle: {
      textAlign: 'center',
      fontSize: 25,
      alignSelf: 'stretch',
      lineHeight: 30,
    },
    selectionDesc: {
      textAlign: 'center',
      fontSize: 15,
      alignSelf: 'stretch',
      lineHeight: 30,
    },
  });