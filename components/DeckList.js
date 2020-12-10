import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../utils/styles';
import TextButton from './TextButton';

class DeckList extends Component {

  renderItem = ({ item }) => (
    <View>
      <TextButton
        style={styles.container}
        onPress={() => this.props.navigation.navigate(
          'DeckView',
          { title: item.title, length: item.length }
        )}>
          <Text style={styles.titleDeckText}>
            {item.title}{'\n'}
          </Text>
          <Text style={styles.bodyDeckText}>
            Number of cards: {item.length}
          </Text>
      </TextButton>
    </View>
  )

	render() {
		const db = this.props.decks;
		debugger;
    const data = Object.keys(db).map(key => (
      {
        'key': key,
        'title': db[key].title,
        'length': db[key].questions.length
      }
    ));
		return (
      <View style={{flex:1}}>
        <Text style={styles.titleText}>
          Choose one Deck
        </Text>
        <FlatList
          data={data}
          renderItem={this.renderItem}
        />
      </View>
		)
	}

}

function mapStateToProps({ decks }) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList);