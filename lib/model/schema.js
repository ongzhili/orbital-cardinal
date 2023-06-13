import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
        name: 'cards',
        columns: [
            { name: 'name', type: 'string' },
            { name: 'front', type: 'string' },
            { name: 'back', type: 'string' }
        ]
    }),
    tableSchema({
        name: 'tags',
        columns: [
            { name: 'name', type: 'string' }
        ]
    }),
    tableSchema({
        name: 'decks',
        columns: [
            { name: 'name', type: 'string' },
            { name: 'description', type: 'string' }
        ]
    }),
    tableSchema({
        name: 'card_deck',
        columns: []
    }),
    tableSchema({
        name: 'card_tag',
        columns: []
    })
  ]
})