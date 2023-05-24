/* eslint-disable react/react-in-jsx-scope */
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../contexts/auth";
import { Slot } from "expo-router";

export default function Root() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <Slot />
            </AuthProvider>
        </SafeAreaProvider>
    )
}