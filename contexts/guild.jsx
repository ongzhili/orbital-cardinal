import { createContext, useState } from "react";

const DEFAULT_GUILD = [
    {
        id: 0,
        title: "",
        description: "",
    }
]

export const GuildContext = createContext();


export function GuildProvider({children}) {
    const [guild, setGuild] = useState(DEFAULT_GUILD);

    return (<GuildContext.Provider value = { {guild , setGuild} }>{children}</GuildContext.Provider>);
}