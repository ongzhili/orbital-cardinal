import { Pressable, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Checkbox } from 'react-native-paper';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native';

const SAMPLE_USER = [
    {
        display_name: "Test User",
    }
]


// export function Option({text}) {
//     const [checked, setChecked] = useState(false);

    


//     return (
//         <View style = {styles.option}>
//             <Text>{text}</Text>
//             <Checkbox
//                 status={checked ? 'checked' : 'unchecked'}
//                 onPress={() => {
//                     setChecked(!checked);
//                 }}
//             />
//         </View>
//     )

// }

export function Option({ text }) {
    const [checked, setChecked] = useState(false);

    return (
        <View style={[styles.option, styles.optionContainer]}>
            <Text style={styles.optionText}>{text}</Text>
            <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                    setChecked(!checked);
                }}
            />
        </View>
    );
}

export default function settings() {

    const [text, onChangeText] = useState(SAMPLE_USER[0].display_name);

    // Temporary to simulate API request to change username
    const [username, changeUsername] = useState(SAMPLE_USER[0].display_name);

    //TODO: Obtain user session data once context is figured out. SAMPLE_USER is used for now.

    const handleUserChange = () => {
        changeUsername(text);
        console.log(username);
    }

    const handleLogOut = () => {
        //TODO
        console.log("User Logged Out");
    }

    return (
        <SafeAreaView>
            <Text>this is the settings menu, currently WIP. This should just have simple account functions (if logged in),
                and maybe a darkmode filter
            </Text>
            <Text style = {[styles.input, styles.optionText]}>
                Current Username:
            </Text>
            <TextInput
              style = {[styles.input, styles.optionText]}
              defaultValue= {SAMPLE_USER[0].display_name}
              onChangeText={onChangeText}
            />
            <TouchableOpacity
                style={[styles.input, styles.button]}
                onPress={handleUserChange}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <Option text = "Dark Theme"/>
            <Button
                onPress = {handleLogOut}
                title= "Log Out (will conditionally render once i get contexts working)"
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    option: {
        flexDirection: 'row',
        alignItems: 'center'
        
      
    },
    optionContainer: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',

    },
    optionText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {

        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
      },
      button: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    

  });