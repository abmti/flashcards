import React from 'react';
import {Button, Text, View} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons'

import DecksList from './DecksList'
import AddDeck from './AddDeck'
import DeckDetail from './DeckDetail'
import AddCard from "./AddCard";
import Quiz from "./Quiz";

const DecksListTab = StackNavigator({
    DecksList: {
        screen: DecksList,
        navigationOptions: {
            title: 'Decks',
        }
    },
    DeckDetail: {
        screen: DeckDetail,
        path: '/decks/:keyDeck',
        navigationOptions: {
            title: 'Deck Detail'
        }
    },
    AddCard: {
        screen: AddCard,
        path: '/addCard/:keyDeck',
    },
    Quiz: {
        screen: Quiz,
        path: '/quiz/:keyDeck',
        navigationOptions: {
            title: 'Quiz'
        }
    }
});

const AddDeckTab = StackNavigator({
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            title: 'Add Deck',
        },
    }
});


const TabNav = TabNavigator(
    {
        DecksTab: {
            screen: DecksListTab,
            path: '/',
            navigationOptions: {
                tabBarLabel: 'Decks',
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={focused ? 'ios-home' : 'ios-home-outline'}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            },
        },
        AddDeckTab: {
            screen: AddDeckTab,
            path: '/addDeck',
            navigationOptions: {
                tabBarLabel: 'Add Deck',
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={focused ? 'ios-add' : 'ios-add-outline'}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            },
        },
    }
);

export default TabNav;
