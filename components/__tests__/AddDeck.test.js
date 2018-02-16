import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import AddDeck from '../AddDeck';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore({})
const props = {
    navigation: {
        addListener: jest.fn()
    }
}

describe('Add Deck', () => {

    it('renders without crashing', async () => {
        store.dispatch = jest.fn();
        const rendered = renderer.create(<AddDeck {...props} store={store} />).toJSON();
        expect(rendered).toMatchSnapshot();
    });

})
