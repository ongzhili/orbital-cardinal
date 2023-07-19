import { children, text, readonly, date } from '@nozbe/watermelondb/decorators'
import { Model, Q } from '@nozbe/watermelondb'
import { database } from '../../index'
import { where } from '@nozbe/watermelondb/QueryDescription'

export default class Card extends Model {
  static table = 'cards'
  static associations = {
    card_deck: { type: 'has_many', foreignKey: 'card_id' },
    card_tag: { type: 'has_many', foreignKey: 'card_id'}
  }

  @children('card_tag') tags
  @children('card_deck') decks

  @readonly @date('updated_at') updatedAt
  @readonly @date('created_at') createdAt
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
   * Creates a new card if it does not exist in the database, otherwise returns an exisiting card.
   * 
   * @param {Card} card 
   * @returns {Card} The existing, or newly created Card.
   */
  static async makeIfAbsent(card) {
    let arr = await database.get('cards').query(
      Q.and(
        Q.where('name', card.cardname),
        Q.where('front', card.front),
        Q.where('back', card.back)
      )
    ).fetch()
    if (arr.length == 0)
      return await Card.makeCard(card.name, card.front, card.back)
    else
      return arr[0]
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