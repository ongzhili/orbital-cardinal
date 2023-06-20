import { createContext, useState } from "react";

const DEFAULT_GUILD = [
    {
        id: 0,
        title: "None",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
        decks: [
            {
                id: 1,
                title: "GuildQ1",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
            }
        ],
        

    }
]

export const GuildContext = createContext();


export function GuildProvider({children}) {
    const [guild, setGuild] = useState(DEFAULT_GUILD);

    return (<GuildContext.Provider value = { {guild , setGuild} }>{children}</GuildContext.Provider>);
}