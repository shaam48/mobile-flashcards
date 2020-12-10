import React, {Component} from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import {connect} from 'react-redux';
import { getDecks } from '../actions';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from './MainTabNavigator';
import { blue } from '../utils/colors';

function MainStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

class AppContainer extends Component {

  componentDidMount() {
    this.props.dispatch(getDecks())
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationContainer>
          <MainStatusBar backgroundColor={blue} barStyle="light-content" />
          <MainTabNavigator />
        </NavigationContainer>
      </View>
    )
  }
}

export default connect()(AppContainer)