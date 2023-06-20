import { Stack, Slot} from "expo-router";
import { GuildProvider } from "../../../contexts/guild";

export default function GuildLayout() {
    return (
        <GuildProvider>
            <Stack /> 
        </GuildProvider>
    )
}