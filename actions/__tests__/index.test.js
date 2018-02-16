import * as actions from '../index'
import {
    FETCH_DECKS,
    ADD_DECK,
    REMOVE_DECK,
    ADD_CARD
} from '../ActionTypes'

const card1 =  {
    question: 'What is React?',
    answer: 'A library for managing user interfaces'
}

const card2 =  {
    question: 'Where do you make Ajax requests in React?',
    answer: 'The componentDidMount lifecycle event'
}

const deck = {
    title: 'React',
    questions: [
        card1,
        card2
    ]
}

const key = "React"

const decks = {
    [key]: deck
}


describe('Actions', () => {

    it('FETCH_DECKS', () => {
        const expectedActions = {type: FETCH_DECKS, decks}
        expect(actions.fetchDecks(decks)).toEqual(expectedActions)
    })

    it('ADD_DECK', () => {
        const expectedActions = {type: ADD_DECK, key, deck}
        expect(actions.addDeck(key, deck)).toEqual(expectedActions)
    })

    it('REMOVE_DECK', () => {
        const expectedActions = {type: REMOVE_DECK, keyDeck: key}
        expect(actions.removeDeck(key)).toEqual(expectedActions)
    })

    it('ADD_CARD', () => {
        const expectedActions = {type: ADD_CARD, key, card: card1}
        expect(actions.addCard(key, card1)).toEqual(expectedActions)
    })

})