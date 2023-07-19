import { SafeAreaView } from 'react-native-safe-area-context';
import { StartingPage } from './StartingPage'
import styles from './styles';

// Starting Page render.
export default function HomePage() {
  return (
      <SafeAreaView style = {styles.mainMenuContainer}>
        <StartingPage />
      </SafeAreaView>
  );
}

