import React from 'react';
import { Platform } from 'react-native';
import DeckList from './DeckList';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import NewDeck from './NewDeck';
import DeckView from './DeckView';
import NewCard from './NewCard';
import Quiz from './Quiz';
import { black, white, blue } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';

const Tabs = createBottomTabNavigator();

const TabNav = () => (
    <Tabs.Navigator
        initialRouteName="DeckList"
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let icon;
						if (route.name === "All Decks") {
              icon = (
                <Ionicons name={Platform.OS === 'ios' ? 'ios-play' : 'md-play'} size={size} color={color}/>
              );
            } else if (route.name === "New Deck") {
              icon = (
                <Ionicons name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'} size={size} color={color}/>
              );
            }
            return icon;
          }
        })}
        tabBarOptions={{
          header: null,
          activeTintColor: Platform.OS === "ios" ? blue : white,
          showIcon: true,
          style: {
            height: 80,
            backgroundColor: white,
            shadowColor: "rgba(0, 0, 0, 0.24)",
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
          }
        }}
    >
      <Tabs.Screen name="All Decks" component={DeckList}/>
      <Tabs.Screen name="New Deck" component={NewDeck}/>
    </Tabs.Navigator>
);

const Stack = createStackNavigator();
const MainTabNavigator = () => (
    <Stack.Navigator headerMode="screen">
        <Stack.Screen
            name="Home"
            component={TabNav}
            options={{headerShown: false}}/>
        <Stack.Screen
            name="DeckView"
            component={DeckView}
            options={{
                headerTintColor: white, headerStyle: {
                    backgroundColor: blue,
                }
            }}/>
        <Stack.Screen
            name="NewCard"
            component={NewCard}
            options={{
                headerTintColor: white, headerStyle: {
                    backgroundColor: blue,
                }
            }}/>
        <Stack.Screen
            name="Quiz"
            component={Quiz}
            options={{
                headerTintColor: white, headerStyle: {
                    backgroundColor: blue,
                }
            }}/>
    </Stack.Navigator>
);

// const MainTabNavigator = createStackNavigator({
// 	Home: {
//     screen: Tabs,
//   },
//   DeckView: {
//     screen: DeckView,
//     navigationOptions: {
//       headerTintColor: white,
//       headerStyle: {
//         backgroundColor: blue
//       }
//     }
//   },
//   NewCard: {
//     screen: NewCard,
//     navigationOptions: {
//       headerTintColor: white,
//       headerStyle: {
//         backgroundColor: blue
//       }
//     }
//   },
//   Quiz: {
//     screen: Quiz,
//     navigationOptions: {
//       headerTintColor: white,
//       headerStyle: {
//         backgroundColor: blue
//       }
//     },
//   },
// })

export default MainTabNavigator;