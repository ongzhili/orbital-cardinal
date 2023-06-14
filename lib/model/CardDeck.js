import { Model } from '@nozbe/watermelondb'
import { immutableRelation } from '@nozbe/watermelondb/decorators'

export default class CardDeck extends Model {
    static table = 'card_deck'
    static associations = {
        cards: { type: 'belongs_to', key: 'card_id' },
        decks: { type: 'belongs_to', key: 'deck_id'}
    }
    @immutableRelation('cards', 'card_id') card
    @immutableRelation('decks', 'deck_id') deck
}