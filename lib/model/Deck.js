import { children, field, text, writer } from '@nozbe/watermelondb/decorators'
import { Model } from '@nozbe/watermelondb'
import { database } from '../../index'
import Card from './Card'

export default class Deck extends Model {
    static table = 'decks'
    static associations = {
        card_deck: { type: 'has_many', foreignKey: 'deck_id' }
    }

    @children('card_deck') cards

    @text('name') name
    @text('description') description

    /**
     * Adds a new Deck to the database.
     * 
     * @param {String} name Name
     * @param {String} description Description
     * @returns {Deck} the new Deck created
     */
    static async makeDeck(name, description) {
        return await database.write(async a => {
            const newDeck = await database.get('decks').create(deck => {
                deck.name = name
                deck.description = description
            })
            console.log(`made deck ${name} ${description}`)
            return newDeck
        })
    }

    /**
     * Adds all the cards in the array to the deck.
     * 
     * assumes that no cards are currently in the deck
     * use setCards if this is not the case.
     * 
     * @param  { ...Card } cards the cards to be added
     */
    @writer
    async addCards(...cards) {
        let arr = []
        for (const card in cards) {
            await this.collections.get('card_deck').create(cardDeck => {
                cardDeck.deck.set(this)
                cardDeck.card.set(card)
            })
        }
        // await this.batch(...arr)
        console.log('added cards to deck')
    }

    /**
     * Sets the cards that belong to this deck.
     * 
     * addCards is preferred for new decks.
     * 
     * @param  { ...Card } cards the new set of cards this deck should contain
     */
    async setCards(...cards) {
        await this.cards.destroyAllPermanently()
        await this.addCards(...cards)
    }

    /**
     * @returns the cards in this deck
     */
    async getCards() {
        const cardDecks = await this.cards.fetch()
        return cardDecks.map(cd => cd.card)
    }

    /**
     * Deletes this deck
     */
    async markAsDeleted() {
        await this.cards.destroyAllPermanently()
        await super.markAsDeleted()
    }
}