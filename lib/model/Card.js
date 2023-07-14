import { children, text } from '@nozbe/watermelondb/decorators'
import { Model } from '@nozbe/watermelondb'
import { database } from '../../index'

export default class Card extends Model {
    static table = 'cards'
    static associations = {
        card_deck: { type: 'has_many', foreignKey: 'card_id' },
        card_tag: { type: 'has_many', foreignKey: 'card_id'}
    }

    @children('card_tag') tags
    @children('card_deck') decks

    @text('name') name
    @text('front') front
    @text('back') back

    /**
     * Adds a new Card in the database.
     * 
     * @param {String} name Name
     * @param {String} front Front
     * @param {String} back Back
     * @returns {Card} The new Card created
     */
    static async makeCard(name, front, back) {
      // const newCard = await database.write(async a => {
      //     const card = await database.get('cards').create(card => {
      //         card.name = name
      //         card.front = front
      //         card.back = back
      //     })
      //     return card
      // })
      // console.log(`made cards ${name} ${front} ${back}`)
      // return newCard
      return await database.write(async a => {
        const newCard = await database.get('cards').create(card => {
          card.name = name
          card.front = front
          card.back = back
        })
        console.log(`made card ${name} ${front} ${back}`)
        return newCard
      })
    }

    /**
     * Adds this card to all the decks in the array.
     * 
     * assumes that this card is currently in no decks
     * use setDecks instead if this is not the case.
     * 
     * @param  {...Deck} decks The decks this card is to be added to
     */
    async addToDecks(...decks) {
        let arr = []
        for (const deck in decks) {
            arr.push(database.get('card_deck').prepareCreate(cardDeck => {
                cardDeck.card.set(this)
                cardDeck.deck.set(deck)
            }))
        }
        await this.batch(arr)
    }

    /**
     * Sets the decks this card belongs to.
     * 
     * addToDecks is preferred for new cards.
     * 
     * @param  {...Deck} decks The new set of decks this card belongs to 
     */
    async setDecks(...decks) {
        await this.decks.destroyAllPermanently()
        await this.addToDecks(...decks)
    }

    /**
     * Adds tags to this card.
     * 
     * assumes that this card currently has no tags
     * use setTags instead if this is not the case.
     * 
     * @param  {...Tag} tags 
     */
    async addTags(...tags) {
        let arr = []
        for (const tag in tags) {
            arr.push(database.get('card_tag').prepareCreate(cardTag => {
                cardDeck.card.set(this)
                cardDeck.tag.set(tag)
            }))
        }
        await this.batch(arr)
    }

    /**
     * Assigns the tags of this card.
     * 
     * addTags is preferred for new cards.
     * 
     * @param  {...Tag} tags The new set of tags this card has
     */
    async setTags(...tags) {
        await this.tags.destroyAllPermanently()
        await this.addTags(...tags)
    }

    /**
     * Deletes this card
     */
    async markAsDeleted() {
        await this.decks.destroyAllPermanently()
        await this.tags.destroyAllPermanently()
        await super.markAsDeleted()
    }

    toString() {
        return this.name;
    }
}