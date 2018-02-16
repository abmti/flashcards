import React, { Component } from 'react';
import { Button, View } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import * as API from '../utils/api'
import { fetchDecks } from "../actions/index";

export class DecksList extends Component {

    componentDidMount() {
        API.fetchDecks().then(decks => {
            this.props.fetchDecks(decks)
        })
    }

    render() {
        const { navigation, decks } = this.props
        return (
            <List>
                {Object.keys(decks).map(key => (
                    <ListItem key={key}
                        onPress={() => navigation.navigate('DeckDetail', {keyDeck: key})}
                        title={decks[key].title}
                        subtitle={`${decks[key].questions.length} cards`}
                    />
                ))}
            </List>
        )
    }

}

const mapStateToProps = (state) => ({decks: state})
const mapDispatchToProps = { fetchDecks }
export default connect(mapStateToProps, mapDispatchToProps)(DecksList)