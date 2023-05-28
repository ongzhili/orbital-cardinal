import { createContext, useState } from "react";

const DEFAULT_DECK = [
    {
        title: "",
        deck: {},
    }
]

export const DeckContext = createContext();


export function DeckProvider({children}) {
    const [deck, setDeck] = useState(DEFAULT_DECK);

    return (<DeckContext.Provider value = { {deck , setDeck} }>{children}</DeckContext.Provider>);
}