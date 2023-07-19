import { Slot } from "expo-router";
import { GuildProvider } from "../../contexts/guild";
import { QuizProvider } from "../../contexts/quiz";

// Layout folder, used to pass context information on to pages in the community section.
export default function Root() {
  return (
    <GuildProvider>
      <QuizProvider>
        <Slot/>
      </QuizProvider>
    </GuildProvider>
  )
}