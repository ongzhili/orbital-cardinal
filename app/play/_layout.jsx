import { Stack } from "expo-router";
import { PlayProvider } from "../../contexts/play";

export default function DeckLayout() {
    return (
        <PlayProvider>
            <Stack /> 
        </PlayProvider>
    )
}