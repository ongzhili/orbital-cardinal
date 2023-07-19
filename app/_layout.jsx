import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../contexts/auth";
import { Slot } from "expo-router";
import { PlayProvider } from "../contexts/play";

// Layout folder, used to pass context information on to pages in the app.
export default function Root() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PlayProvider>
          <Slot /> 
        </PlayProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}