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



    return (
        <SafeAreaView>
            <Text>this is the settings menu, currently WIP. This should just have simple account functions (if logged in),
                and maybe a darkmode filter
            </Text>

            <Option text = "Dark Theme"/>
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