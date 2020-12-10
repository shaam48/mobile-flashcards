import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TextInput, Alert, Keyboard, Platform } from 'react-native';
import TextButton from './TextButton';
import { styles } from '../utils/styles';
import { saveDeckTitle } from '../actions';

class NewDeck extends Component {
  state = {
    title: '',
    questions: []
  }

  submit = () => {
    if(this.state.title !== ''){
      this.props.dispatch(saveDeckTitle(this.state.title));
      
      this.setState({
        title: ''
      });
      
      this.props.navigation.navigate(
        'DeckView',
        {
          title: this.state.title,
        }
      );
    } else {
      Alert.alert(
        'Oops, there is an issue',
        'Please, add a title to your new deck!',
        [
          {text: 'OK'}
        ],
        { cancelable: false }
      );
    }
  }

  render(){
    return(
      <View style={{flex:1, justifyContent: 'space-between'}}>
        <Text style={styles.titleText}>
          New Deck Title
        </Text>
        <TextInput
          style={styles.deckTitleText}
          placeholder="Deck Title"
          value={this.state.title}
          onChangeText={(title) => this.setState({title})}
          onSubmitEditing={Keyboard.dismiss}
        />
        <TextButton
          style={[styles.container, styles.buttonText]}
          onPress={() => this.submit()}
        >
          Submit
        </TextButton>
      </View>
    )
  }
}

export default connect()(NewDeck);