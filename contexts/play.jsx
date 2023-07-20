import { createContext, useContext, useState } from "react";

export const PlayContext = createContext();

export function PlayProvider({children}) {
    const [deck, setDeck] = useState(null);
    const [next, setNext] = useState("")
    const [card, setCard] = useState(null)
    const setLink = (link) => {
      setNext(link)
      console.log("link " + link)
    }
    return (<PlayContext.Provider value = { { deck , setDeck, next, setNext, setLink, card, setCard } }>{children}</PlayContext.Provider>);
}

export function usePlay() {
  return useContext(PlayContext)
}