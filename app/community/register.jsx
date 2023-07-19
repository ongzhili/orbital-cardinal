import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { View , Image } from "react-native";
import { Text, TextInput, ActivityIndicator, Button } from 'react-native-paper';
import { useRouter } from "expo-router";
import styles from "../styles";

export default function Register() {
  // States and Variables used in current Page.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const router = useRouter();

  // Function to handle registration via supabase.
  const handleSubmit = async () => {
    if (email == '') {
      setErrMsg("email cannot be empty")
      return;
    }
    if (password == '') {
      setErrMsg("password cannot be empty")
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setErrMsg(error.message);
      return;
    } else {
      router.replace('./commHome')
    }
  }

  // Render
  return (
    <View style={styles.loginCont}>
      <Image style = {styles.loginImage} source = {require('../../assets/adaptive-icon.png')}>
      </Image>
      <Text style = {styles.promptText}>Make an account here!</Text>
      {errMsg !== "" && <Text style = {styles.errMsg}>{"Error: " + errMsg}</Text>}
      <TextInput
        style={styles.inputContainer}
        autoCapitalize='none'
        textContentType='emailAddress'
        value={email}
        placeholder={"E-mail"}
        onChangeText={setEmail} />
      <TextInput
        style={styles.inputContainer}
        secureTextEntry
        placeholder={"Password"}
        autoCapitalize='none'
        textContentType='password'
        value={password}
        onChangeText={setPassword} />
      <Button 
        mode='contained'
        buttonColor="#2e2933"
        style={styles.inputContainer}
        labelStyle={styles.loginButtonText}
        onPress={handleSubmit}>Register Now!</Button>
      {loading && <ActivityIndicator />}
    </View>
  );
}

  