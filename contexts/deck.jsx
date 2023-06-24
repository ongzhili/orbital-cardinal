import { createContext, useState } from "react";

const DEFAULT_DECK = [
    {
        name: "",
        deck: {},
    }
]

export const DeckContext = createContext();


export function DeckProvider({children}) {
    const [deck, setDeck] = useState(DEFAULT_DECK);

    const [loaded, setLoaded] = useState(false);

    return (<DeckContext.Provider value = { {deck , setDeck, /* loaded, setLoaded */} }>{children}</DeckContext.Provider>);
}