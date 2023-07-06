import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../../contexts/auth";
import { Stack, Slot } from "expo-router";
import { GuildProvider } from "../../contexts/guild";
import { QuizProvider } from "../../contexts/quiz";

export default function Root() {
    return (
        <AuthProvider>
            <GuildProvider>
                <QuizProvider>
                    <Slot />
                </QuizProvider>
            </GuildProvider>
        </AuthProvider>
            //<Slot></Slot>
    )
}