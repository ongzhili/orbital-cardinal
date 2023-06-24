import { Stack } from "expo-router";
import { DeckProvider } from "../../contexts/deck";

export default function DeckLayout() {
    return (
        <DeckProvider>
            <Stack /> 
        </DeckProvider>
    )
}