import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Text, View, StyleSheet } from 'react-native';
import { Button as Btn } from 'react-native-elements'


import * as API from '../utils/api'
import { removeDeck } from "../actions/index";

class DeckDetail extends Component {

    handleDeleteDeck = (keyDeck) => {
        const { dispatch, navigation } = this.props
        API.removeDeck(keyDeck).then(() => {
            dispatch(removeDeck(keyDeck))
            navigation.goBack()
            alert('Deleted')
        })
    }

    render() {
        const {navigation, decks} = this.props
        const keyDeck = navigation.state.params.keyDeck
        const deck = decks[keyDeck]

        if (deck == undefined) {
            return null
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {deck.title}
                </Text>
                <Text style={styles.subTitle}>
                    {deck.questions.length} cards
                </Text>

                <Btn style={{marginTop: 30}}
                     buttonStyle={{backgroundColor: 'white', borderColor: 'rgba(78, 116, 289, 1)', borderWidth: 0.5}}
                     textStyle={{color: 'rgba(78, 116, 289, 1)'}}
                     onPress={() => navigation.navigate('AddCard', { keyDeck })}
                     title="Add Card"
                />

                <Btn style={{marginTop: 5}}
                     disabled={deck.questions.length === 0}
                     buttonStyle={{backgroundColor: 'white', borderColor: 'rgba(78, 116, 289, 1)', borderWidth: 0.5}}
                     textStyle={{color: 'rgba(78, 116, 289, 1)'}}
                     onPress={() => navigation.navigate('Quiz', { keyDeck })}
                     title="Start Quiz"
                />

                <Button style={{marginTop: 5}}
                    onPress={() => this.handleDeleteDeck(keyDeck)}
                    title={`Remove Deck`}
                />

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
        padding: 5,
        fontSize: 22,
        textAlign: 'center'
    },
    subTitle: {
        padding: 5,
        fontSize: 14,
        color: 'gray',
        textAlign: 'center'
    },
})

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(DeckDetail)
