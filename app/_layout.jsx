/* eslint-disable react/react-in-jsx-scope */
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../contexts/auth";
import { Slot, Stack } from "expo-router";

export default function Root() {
    return (
        <SafeAreaProvider>
                <Slot />
        </SafeAreaProvider>
    )
}