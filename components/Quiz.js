import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Text, View, StyleSheet, Animated, Easing } from 'react-native';
import { Button as Btn } from 'react-native-elements'


import * as API from '../utils/api'
import { removeDeck } from "../actions/index";

class Quiz extends Component {

    state = {
        index: 0,
        showAnswer: false,
        corrects: 0,
        opacity: new Animated.Value(1),
    }

    toogleQuestionAndAnswer = () => {
        this.state.opacity.setValue(0)
        this.setState({showAnswer: !this.state.showAnswer})
        Animated.timing(
            this.state.opacity,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }
        ).start()
    }

    submitAnswer = (correct) => {
        if(correct) {
            this.setState({corrects: (this.state.corrects + 1)})
        } else {
            this.setState({incorrects: (this.state.incorrects + 1)})
        }
        this.setState({index: (this.state.index + 1), showAnswer: false})
    }

    restartQuiz = () => {
        this.setState({index: 0, corrects: 0, incorrects: 0, showAnswer: false})
    }

    render() {
        const {navigation, decks} = this.props
        const keyDeck = navigation.state.params.keyDeck
        const deck = decks[keyDeck]
        const index = this.state.index
        const animatedText = index < deck.questions.length ? (this.state.showAnswer ? deck.questions[this.state.index].answer : deck.questions[this.state.index].question) : ''

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Quiz - {deck.title}
                </Text>

                {index < deck.questions.length ? (

                    <View>
                        <Text style={styles.subTitle}>
                            {this.state.index+1}/{deck.questions.length}
                        </Text>

                        <Animated.Text style={[styles.text, {opacity: this.state.opacity}]}>
                            {animatedText}
                        </Animated.Text>

                        <Button onPress={this.toogleQuestionAndAnswer} title={`${this.state.showAnswer ? 'Show Question' : 'Show Answer'} `}/>

                        <Btn onPress={() => this.submitAnswer(true)}
                            buttonStyle={{backgroundColor: 'green', width: null, height: 40, marginTop: 30}}
                            textStyle={{color: 'white', marginHorizontal: 20}}
                            title='Correct'
                        />

                        <Btn onPress={() => this.submitAnswer(false)}
                            buttonStyle={{backgroundColor: 'red', width: null, height: 40, marginTop: 5}}
                            textStyle={{color: 'white', marginHorizontal: 20}}
                            title='Incorrect'
                        />
                    </View>

                ) : (

                    <View>
                        <Text style={styles.subTitle}>
                            End QUIZ
                        </Text>
                        <Text style={styles.subTitle}>
                            Correct: {this.state.corrects}
                        </Text>
                        <Text style={styles.subTitle}>
                            Incorrect: {this.state.incorrects}
                        </Text>

                        <Button onPress={this.restartQuiz} title='Restart Quiz'/>

                    </View>

                )}


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
    text: {
        marginTop: 20,
        padding: 5,
        fontSize: 22,
        textAlign: 'center'
    },
})

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(Quiz)
