import { children, field, text, writer, readonly, date } from '@nozbe/watermelondb/decorators'
import { Model } from '@nozbe/watermelondb'
import { database } from '../../index'
import { sanitizedRaw } from '@nozbe/watermelondb/RawRecord'

export default class Deck extends Model {
  static table = 'decks'
  static associations = {
    card_deck: { type: 'has_many', foreignKey: 'deck_id' }
  }

  @children('card_deck') cards

  @readonly @date('updated_at') updatedAt
  @readonly @date('created_at') createdAt
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

  static async update(deck) {
    let dec = null
    try {
      dec = await database.get('decks').find(deck.id)
    } catch (e) {
      let collection = database.get('decks')
      return await database.write(async a => {
        return await collection.create(record => {
          record._raw = sanitizedRaw({ id: deck.id, name: deck.title, description: deck.description }, collection.schema)
        })
      })
    }
    await database.write(async a => {
      dec.update(dec => {
        dec.name = deck.name
        dec.description = deck.description
      })
    })
    return dec
  }

  /**
   * Sets the fields of the deck.
   * 
   * @param { String } name 
   * @param { String } description
   * @returns This deck for chaining.
   */
  @writer
  async setFields(name, description) {
    await this.update(deck => {
      deck.name = name
      deck.description = description
    })
    return this
  }

  /**
   * Sets the name of the deck.
   * @param {String} name Name
   * @returns {Deck} this deck for chaining
   */
  @writer
  async setName(name) {
    await this.update(deck => {
      deck.name = name
    })
    return this
  }

  /**
   * Sets the description of the deck.
   * @param {String} description Description
   * @returns {Deck} this deck for chaining
   */
  async setDescription(description) {
    await this.update(deck => {
      deck.description = description
    })
    return this
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
    for (card of cards) {
      console.log(card)
      console.log(card.id)
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
    await this.removeCards()
    await this.addCards(...cards)
  }

  /**
   * Removes all cards in the deck.
   */
  @writer
  async removeCards() {
    await this.cards.destroyAllPermanently()
  }

  /**
   * @returns An array of the cards in this deck.
   */
  async getCards() {
    const cardDecks = await this.cards.fetch()
    console.log(cardDecks)
    const arr = []
    for (cd of cardDecks) {
      arr.push(await cd.card.fetch())
    }
    return arr
  }

  /**
   * Deletes this deck.
   */
  @writer
  async markAsDeleted() {
    await this.cards.destroyAllPermanently()
    await super.markAsDeleted()
  }

  toString() {
    return this.name;
  }
}