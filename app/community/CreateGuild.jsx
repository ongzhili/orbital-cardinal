import React, { useContext, useState, useEffect} from 'react';
import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';
import { GuildContext } from '../../contexts/guild';
import { useRouter } from 'expo-router';


export default function MyForm() {
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

  const handleInputChange = (input, setInput) => {
    setInput(input);
  };

  const handleSubmit = async () => {
    const { data, error } = await supabase
    .rpc('create_guild', {
      guilddescription: desc, 
      name: guildtitle, 
      userid: currentUser.user.id
    })

    if (error) {
      console.error(error);
      setError(error.message);
    } else {
      console.log(data);
      currentGuild.setGuild(data);
      router.replace("./Community");

    } 
    console.log('Community name:', guildtitle);
    console.log('Description:', desc);
  };

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange(text, setGuildtitle)}
        value={guildtitle}
        placeholder="Community Name: "
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange(text, setDesc)}
        value={desc}
        maxLength={500}
        placeholder="Description: (Max 500 characters)"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
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
