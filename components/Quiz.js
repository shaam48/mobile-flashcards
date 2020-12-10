import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { styles } from '../utils/styles';
// import { setLocalNotification, clearLocalNotification } from '../utils/helpers';

class Quiz extends Component {

  state = {
    title: '',
    currentQuestion: '',
    currentAnswer: '',
    questionNumber: 0,
    numberOfQuestions: 0,
    score: 0
  }

  componentDidMount() {
    if(Platform.OS === "ios" || Platform.OS === "android") {
      // clearLocalNotification().then(setLocalNotification);
    }
    const title = this.props.route.params.title;
    const questions = this.props.decks[title].questions;
    console.log('Quiz:' + questions);
    this.setState({
      title: this.props.route.params.title,
      currentQuestion: questions[0].question,
      questionNumber: 1,
      numberOfQuestions: questions.length,
      questions: questions,
      quizFinished: false,
    })
  }

  updateQuestion = () => {
    const newQuestionNumber = this.state.questionNumber + 1;
    if (newQuestionNumber-1 < this.state.numberOfQuestions) {
      this.setState({
        currentAnswer: '',
        currentQuestion: this.state.questions[newQuestionNumber-1].question,
        questionNumber: newQuestionNumber,
      });
    } else {
      this.setState({
        quizFinished: true
      })
    }

  }

  updateScore = () => {
    const newScore = this.state.score + 1;
    this.setState({
      score: newScore
    })
  }

  showAnswer = () => {
    if (this.state.currentAnswer === '')
      this.setState({
        currentAnswer: this.state.questions[this.state.questionNumber-1].answer,
      })
  }

  nextQuestion = (isCorrect) => {
    if (this.state.currentAnswer === '') {
      Alert.alert(
        'Oops, there is an issue',
        'Please, see answer first!',
        [
          {text: 'OK'}
        ],
        { cancelable: false }
      );
      return;
    }

    if (isCorrect) {
      this.updateScore();
    }
    this.updateQuestion();
  }

  resetQuiz = () => {
    this.setState({
      currentQuestion: this.state.questions[0].question,
      currentAnswer: '',
      questionNumber: 1,
      score: 0,
      quizFinished: false,
    });
  }

  backToDeck = () => {
    this.props.navigation.navigate(
      'Home'
    );
  }

  render() {
    return(
      <View style={{flex:1, justifyContent: 'space-between'}}>
        <View style={styles.header}>
          <Text style={{fontSize: 20, alignItems: 'flex-start'}}>{this.state.title} Quiz</Text>
          <Text style={{fontSize: 20, alignItems: 'flex-end'}}>Score: {this.state.score}</Text>
        </View>
        {!this.state.quizFinished
        ?
          <View>
            <View>
              <Text style={styles.titleText}>Question {this.state.questionNumber} of {this.state.numberOfQuestions}</Text>
            </View>
            <Text style={styles.questionText}>{this.state.currentQuestion}</Text>
            <TextButton style={[styles.container, styles.buttonText]} onPress={() => this.showAnswer()}>Answer</TextButton>
            <Text style={styles.questionText}>{this.state.currentAnswer}</Text>
            <TextButton style={[styles.container, styles.buttonTextCorrect]} onPress={() => this.nextQuestion(true)}>Correct</TextButton>
            <TextButton style={[styles.container, styles.buttonTextIncorrect]} onPress={() => this.nextQuestion(false)}>Incorrect</TextButton>
          </View>
        :
          <View>
            <Text style={styles.quizFinishedText}>Quiz Finished!</Text>
            <Text style={styles.questionText}>Review</Text>
            <Text style={styles.questionText}>Correct answers: {this.state.score}</Text>
            <Text style={styles.questionText}>Total questions: {this.state.numberOfQuestions}</Text>
            <Text style={styles.questionText}>Your Scored: {(this.state.score/this.state.numberOfQuestions*100.0).toFixed(0)}%</Text>
            <TextButton
              style={[styles.container, styles.buttonText]}
              onPress={() => this.resetQuiz()}
            >
                Restart Quiz
            </TextButton>
            <TextButton
              style={[styles.container, styles.buttonText]}
              onPress={() => this.backToDeck()}
            >
              Back to Deck
            </TextButton>
          </View>
        }
      </View>
    )
  }
}

function mapStateToProps({decks}) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Quiz);