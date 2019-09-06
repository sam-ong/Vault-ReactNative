import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Loading from './src/screens/loading'
import SignUp from './src/screens/signup'
import Login from './src/screens/login'
import Home from './src/screens/home'
import Discover from './src/screens/discover'
import Search from './src/screens/search'
// import config from './src/common/constants.js';

const initialLogin = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
  },
  {
    initialRouteName: 'Loading'
  }
)

const TabNavigator = createBottomTabNavigator(
  {
    Home: Home,
    Discover: Discover,
    Search: Search
  }
)

const AppNavigator = createSwitchNavigator(
  {
    initialLogin,
    TabNavigator
  },
  {
    initialRouteName: 'initialLogin'
  }
)

const App = createAppContainer(AppNavigator);

export default App
