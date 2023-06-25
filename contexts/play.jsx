import { createContext, useState } from "react";

const DEFAULT_DECK = [
    {
        name: "",
        deck: {},
    }
]

export const PlayContext = createContext();


export function PlayProvider({children}) {
    const [deck, setDeck] = useState(null);
    const [mode, setMode] = useState("Review")

    return (<PlayContext.Provider value = { { deck , setDeck, mode, setMode } }>{children}</PlayContext.Provider>);
}