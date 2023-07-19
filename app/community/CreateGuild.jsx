import { useContext, useState, useEffect} from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';
import { GuildContext } from '../../contexts/guild';
import { useRouter } from 'expo-router';
import { Button, TextInput } from 'react-native-paper';
import styles from '../styles';

// Page render
export default function CreateGuild() {
  // States and variables used for the page.
  const [guildtitle, setGuildtitle] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState(null);
  const currentUser = useAuth();
  const currentGuild = useContext(GuildContext);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  // Handles input change (of textinput)
  const handleInputChange = (input, setInput) => {
    setInput(input);
  };

  // Handles submitting (a.k.a Guild Creation)
  const handleSubmit = async () => {
    const { data, error } = await supabase
    .rpc('create_guild', {
      guilddescription: desc, 
      name: guildtitle, 
      userid: currentUser.user.id
    })

    if (error) {
      console.error(error);
      if (error.code == 23505) {
        setError("Someone has already used this name!")
      } else {
        setError(error.message);
      }
    } else {
      console.log(data);
      currentGuild.setGuild(data);
      router.replace("./Community");

    } 
    console.log('Community name:', guildtitle);
    console.log('Description:', desc);
  };

  return (
    <View style={[styles.mainMenuContainer2, {marginHorizontal: 20}]}>
      <Image style = {styles.loginImage} source = {require('../../assets/adaptive-icon.png')}>
      </Image>
      {error && <Text style={styles.errMsg}>{error}</Text>}
      <TextInput
        style={styles.inputContainer}
        autoCapitalize='none'
        value={guildtitle}
        maxLength= {20}
        placeholder="Community Name: (Max 20 characters)"
        onChangeText={(text) => handleInputChange(text, setGuildtitle)} />
      <TextInput
        style={styles.inputContainer}
        autoCapitalize='none'
        value={desc}
        multiline
        maxLength={500}
        placeholder="Description: (Max 500 characters)"
        onChangeText={(text) => handleInputChange(text, setDesc)} />
      <Button 
        mode='contained'
        buttonColor="#2e2933"
        style={styles.inputContainer}
        labelStyle={styles.loginButtonText} 
        onPress={handleSubmit}>
          {"Create " + guildtitle + "!"}
      </Button>
    </View>
  );
};

const stylesb = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
