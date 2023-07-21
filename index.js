import "expo-router/entry";
import 'react-native-gesture-handler';

// WatermelonDB setup
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from './lib/model/schema'
import migrations from './lib/model/migrations'
// import Post from './model/Post' // ⬅️ You'll import your Models here
import { Card, CardDeck, CardTag, Deck, Tag } from "./lib/model"

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  migrations,
  // (optional database name or file system path)
  dbName: 'cardinal',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: true, /* Platform.OS === 'ios' */
  // (optional, but you should implement this method)
  onSetUpError: error => {
    // Database failed to load -- offer the user to reload the app or log out
    console.log('asd')
  }
})

// Then, make a Watermelon database from it!
export const database = new Database({
  adapter,
  modelClasses: [
    Card, CardDeck, CardTag, Deck, Tag
  ],
})