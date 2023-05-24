import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../../contexts/auth";
import { Stack, Slot } from "expo-router";

export default function Root() {
    return (
            <AuthProvider>
                <Slot />
            </AuthProvider>
            //<Slot></Slot>
    )
}