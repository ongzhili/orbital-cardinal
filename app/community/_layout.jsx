import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../../contexts/auth";
import { Stack, Slot } from "expo-router";
import { GuildProvider } from "../../contexts/guild";

export default function Root() {
    return (
        <AuthProvider>
            <GuildProvider>
                <Slot />
            </GuildProvider>
        </AuthProvider>
            //<Slot></Slot>
    )
}