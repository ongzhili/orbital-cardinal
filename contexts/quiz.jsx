import { createContext, useState } from "react";

const DEFAULT_QUIZ = [
    {
        title: "None",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
        decks: []
        

    }
];


export const QuizContext = createContext();


export function QuizProvider({children}) {
    const [quiz, setQuiz] = useState(DEFAULT_QUIZ);

    return (<QuizContext.Provider value = { {quiz , setQuiz} }>{children}</QuizContext.Provider>);
}