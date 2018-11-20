import React, {Component} from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createAppContainer,
        createStackNavigator,
        createBottomTabNavigator,
        StackActions,
        TabBarBottom,
        NavigationActions }
        from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import TripsScreen from './TripsScreen';

const AppNavigator = createBottomTabNavigator( //createStackNavigator({
{
  Home: { screen: HomeScreen },
  Trips: { screen: TripsScreen },
  Details: { screen: DetailsScreen }
},
{
  defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;

        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Details') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  },
);

const AppContainer = createAppContainer(AppNavigator);
const store = createStore(reducers);

class App extends React.Component {
  render() {
            return (<Provider store={store}>
                      <AppContainer />
                    </Provider>);
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
