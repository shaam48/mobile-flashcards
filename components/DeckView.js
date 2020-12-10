import React, { Component } from 'react';
import { View, Text, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../utils/styles';
import TextButton from './TextButton';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class DeckView extends Component {

  state = {
    title: '',
    length: ''
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      const data = this.props.decks;
      const title = this.props.route.params.title;
      const length = data[title].questions.length;

      this.setState({
        title: title,
        length: length,
      })
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    if (this.focusListener != null && this.focusListener.remove) {
        this.focusListener.remove();
    }
  }

  startQuiz = () => {
    if (this.state.length !== 0) {
      if(Platform.OS === "ios" || Platform.OS === "android"){
        clearLocalNotification().then(setLocalNotification())
      }

      this.props.navigation.navigate(
        'Quiz',
        {
          title: this.state.title,
        }
      )
    } else {
      Alert.alert(
        'Oops, there is an issue',
        'Please, add questions first!',
        [
          {text: 'OK'}
        ],
        { cancelable: false }
      )
    }
  }

  addCard = () => {
    this.props.navigation.navigate(
      'NewCard',
      {
        title: this.state.title,
      }
    )
  }

  render(){
    return(
      <View style={{flex:1, justifyContent: 'space-between'}}>
        <View>
          <Text style={styles.titleText}>{this.state.title}</Text>
          <Text style={styles.bodyText}>{this.state.length} cards</Text>
        </View>
        <View>
          <TextButton
            style={[styles.container, styles.buttonText]}
            onPress={() => this.addCard()}>
              Add Card
          </TextButton>
          <TextButton
            style={[styles.container, styles.buttonText]}
            onPress={() => this.startQuiz()}>
              Start Quiz
          </TextButton>
        </View>
      </View>
    )
  }
}

function mapStateToProps({decks}) {
  return {
    decks
  }
}

function mapDispatchToProps({navigation}) {
  return {
    goBack: () => navigation.goBack()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckView);