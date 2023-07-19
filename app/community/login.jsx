import { View, Image } from "react-native";
import { useState } from "react";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { Link, useRouter } from "expo-router"; 
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/auth";
import styles from "../styles";

export default function LoginPage() {
  // States involved in the login page.
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const useCont = useAuth();

  // Function to handle logging in through supabase.
  const handleSubmit = async () => {
    if (email == '') {
        setErrMsg('e-mail cannot be empty!');
    }
    if (password == '') {
        setErrMsg('Password cannot be empty!')
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
        setErrMsg(error.message);
    } 
    useCont.setUser(data.session.user);
    router.replace("./commHome");
  }

  // Render
  return (
    <View style={styles.loginCont}>
      <Image style = {styles.loginImage} source = {require('../../assets/adaptive-icon.png')}>
      </Image>
      <Text style = {styles.promptText}>To participate in communities, you need to login or register!</Text>
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
        onPress={handleSubmit}>
          Log In
      </Button>
      {loading && <ActivityIndicator />}
      <Link style = {{marginVertical:10}} href="./register">
          <Button >Don't have an account? Register now!</Button>
      </Link>
    </View>
  )
}
