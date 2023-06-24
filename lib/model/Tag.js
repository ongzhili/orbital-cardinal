import { children, field, text } from '@nozbe/watermelondb/decorators'
import { Model } from '@nozbe/watermelondb'
import { database } from '../../index'
import Card from './Card'

export default class Tag extends Model {
    static table = 'tags'
    static associations = {
        card_tag: { type: 'has_many', foreignKey: 'tag_id' }
    }

    @children('card_tag') cards

    @text('name') name

    /**
     * Adds a new Tag to the database.
     * 
     * @param {String} name Name
     * @returns {Tag} the newly created Tag
     */
    static async makeTag(name) {
        return await database.write(async a => {
            const newTag = await database.get('tags').create(tag => {
                tag.name = name
            })
            console.log(`made tag ${name}`)
            return newTag
        })
    }

    /**
     * Adds cards to this tag.
     * 
     * assumes that there are no cards that have this tag
     * use setCards if this is not the case.
     * 
     * @param  {...Card} cards The cards that should have this tag
     */
    async addCards(...cards) {
        let arr = []
        for (const card in cards) {
            arr.push(database.get('card_tag').prepareCreate(cardTag => {
                cardTag.card.set(card)
                cardTag.tag.set(tag)
            }))
        }
        await this.batch(arr)
    }

    /**
     * Sets the cards that have this tag.
     * 
     * addCards is preferred for new Tags.
     * 
     * @param  {...Card} cards The cards that should have this tag
     */
    async setCards(...cards) {
        await this.cards.destroyAllPermanently()
        await this.addCards(...cards)
    }

    async markAsDeleted() {
        await this.cards.destroyAllPermanently()
        await super.markAsDeleted()
    }

    toString() {
        return this.name;
    }
}