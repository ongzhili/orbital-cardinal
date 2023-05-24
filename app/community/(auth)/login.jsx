import { View } from "react-native";
import { useState } from "react";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { Link, useRouter } from "expo-router"; 
import { supabase } from "../../../lib/supabase";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async () => {
        if (email == '') {
            setErrMsg('e-mail cannot be empty!');
        }
        if (password == '') {
            setErrMsg('Password cannot be empty!')
        }
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (error) {
            setErrMsg(error.message);
        }
    }



    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>To participate in communities, you need to login or register!</Text>
            <Text>Email</Text>
            <TextInput
                autoCapitalize='none'
                textContentType='emailAddress'
                value={email}
                onChangeText={setEmail} />
            <Text>Password</Text>
            <TextInput
                secureTextEntry
                autoCapitalize='none'
                textContentType='password'
                value={password}
                onChangeText={setPassword} />
            <Button onPress={handleSubmit}>Submit</Button>
            {errMsg !== "" && <Text>{errMsg}</Text>}
            {loading && <ActivityIndicator />}
            <Link href="/register">
                <Button>Go to register</Button>
            </Link>
            <Link href="./StartingPage">
                <Button>Continue Offline</Button>
            </Link>
        </View>
    )
}