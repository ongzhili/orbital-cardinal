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
        columns: [
            { name: "card_id", type: "string", isIndexed: true },
            { name: "deck_id", type: "string", isIndexed: true }
        ]
    }),
    tableSchema({
        name: 'card_tag',
        columns: [
            { name: "card_id", type: "string", isIndexed: true },
            { name: "tag_id", type: "string", isIndexed: true }
        ]
    })
  ]
})