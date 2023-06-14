import { Model } from '@nozbe/watermelondb'
import { immutableRelation } from '@nozbe/watermelondb/decorators'

export default class CardDeck extends Model {
    static table = 'card_tag'
    static associations = {
        cards: { type: 'belongs_to', key: 'card_id' },
        tags: { type: 'belongs_to', key: 'tag_id'}
    }
    @immutableRelation('cards', 'card_id') card
    @immutableRelation('tags', 'tag_id') tag
}