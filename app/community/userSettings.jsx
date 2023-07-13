import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { View } from "react-native";
import { Text, TextInput, ActivityIndicator, Button } from 'react-native-paper';
import { useAuth } from "../../contexts/auth";
import { useRouter } from "expo-router";

export default function usetSettings() {
    const router = useRouter();
    const currentUser = useAuth();
    const [display, setDisplay] = new useState("");
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [init, setInit] = new useState(false);

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
    
    const handleLogOut = async () => {
        let { error } = await supabase.auth.signOut();
        console.log("User Logged Out");
        router.replace("./commHome");
    }

    const handleName = async () => {
        //TODO: Get the activity indicator working
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
        
        console.log(data);
        setDisplay(data[0].display_name);
      }
    
    if (!init) {

    handleName();
    setInit(true);
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>Display Name</Text>
            <TextInput
                autoCapitalize='none'
                value={display}
                onChangeText={setDisplay} />
            <Button onPress={handleUserNameChange}>Submit</Button>
            <Button onPress={handleLogOut}>Log Out</Button>
            {errMsg !== "" && <Text>{errMsg}</Text>}
        </View>
    );
}