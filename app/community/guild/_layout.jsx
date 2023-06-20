import { Stack, Slot} from "expo-router";
import { GuildProvider } from "../../../contexts/guild";
import { AuthProvider } from "../../../contexts/auth";

export default function GuildLayout() {
    return (
        <GuildProvider>
                <Stack /> 
        </GuildProvider>
    )
}