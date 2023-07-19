import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { View } from "react-native";
import { Text, TextInput, ActivityIndicator, Button } from 'react-native-paper';
import { useAuth } from "../../contexts/auth";
import { useRouter } from "expo-router";
import styles from "../styles";

export default function userSettings() {
  // States and variables used in the function.
  const router = useRouter();
  const currentUser = useAuth();
  const [display, setDisplay] = new useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [init, setInit] = new useState(false);

  // Function to handle display_name change.
  const handleUserNameChange = async () => {     
    const { data, error } = await supabase
      .from('Users')
      .update({ display_name: display })
      .eq('user_id', currentUser.user.id)
      .select();
    if (error) {
      setErrMsg(error.message);
    }
  }
  
  // Function to handle logging out.
  const handleLogOut = async () => {
    let { error } = await supabase.auth.signOut();
    console.log("User Logged Out");
    router.replace("./commHome");
  }

  // Function to get display name.
  const handleName = async () => {
    setLoading(true);
    const {data, error} = await supabase
      .from('Users')
      .select('display_name', 'user_id')
      .eq('user_id', currentUser.user.id)
      .limit(1);
    if (error) {
      setErrMsg(error.message);
    }
    setLoading(false);
    setDisplay(data[0].display_name);
  }

  // Initialization
  if (!init) {
    handleName();
    setInit(true);
  }

  // Render
  return (
    <View style={styles.loginCont}>
      <Text style = {styles.promptTextTitle}>Display Name</Text>
      <TextInput
        style = {styles.inputContainer}
        autoCapitalize='none'
        value={display}
        onChangeText={setDisplay} />
      <Button
        mode='contained'
        buttonColor="#2e2933"
        style={styles.inputContainer}
        labelStyle={styles.loginButtonText}  
        onPress={handleUserNameChange}>
          Change Name
      </Button>
      <Button
        mode='contained'
        buttonColor="#2e2933"
        style={styles.inputContainer}
        labelStyle={styles.loginButtonText}  
        onPress={handleLogOut}>
          Log Out
      </Button>
      {errMsg !== "" && <Text>{errMsg}</Text>}
    </View>
  );
}