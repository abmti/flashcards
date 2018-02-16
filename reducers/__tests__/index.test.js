import reducer from '../index'
import {
    FETCH_DECKS,
    ADD_DECK,
    REMOVE_DECK,
    ADD_CARD
} from '../../actions/ActionTypes'


const card1 =  {
    question: 'What is React?',
    answer: 'A library for managing user interfaces'
}

const card2 =  {
    question: 'Where do you make Ajax requests in React?',
    answer: 'The componentDidMount lifecycle event'
}

const deck1 = {
    title: 'React',
    questions: [
        card1
    ]
}

const deck2 = {
    title: 'React',
    questions: [
        card2
    ]
}

const key = "React"

const decks = {
    [key]: deck1
}

describe('Reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })


    it('FETCH_DECKS', () => {
        expect(
            reducer({}, {
                type: FETCH_DECKS,
                decks
            })
        ).toEqual(decks)
    })

    it('ADD_DECK', () => {
        const state = decks
        const key2 = "Redux"
        const expectedState = { ...state, [key2]: deck2 }
        expect(
            reducer(state, {
                type: ADD_DECK,
                key: key2,
                deck: deck2
            })
        ).toEqual(expectedState)
    })

    it('REMOVE_DECK', () => {
        const state = decks
        const expectedState = {}
        expect(
            reducer(state, {
                type: REMOVE_DECK,
                keyDeck: key
            })
        ).toEqual(expectedState)
    })

    it('ADD_CARD', () => {
        const state = decks
        const expectedState = { ...state }
        expectedState[key].questions.push(card2)
        expect(
            reducer(state, {
                type: ADD_CARD,
                key: key,
                card: card2
            })
        ).toEqual(expectedState)
    })

})