import { createContext, useContext, useState } from "react";

export const PlayContext = createContext();

export function PlayProvider({children}) {
    const [deck, setDeck] = useState(null);
    const [next, setNext] = useState("")
    const setLink = (link) => {
      setNext(link)
      console.log("link " + link)
    }
    return (<PlayContext.Provider value = { { deck , setDeck, next, setNext, setLink } }>{children}</PlayContext.Provider>);
}

export function usePlay() {
  return useContext(PlayContext)
}