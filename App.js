import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Loading from './src/screens/loading'
import SignUp from './src/screens/signup'
import Login from './src/screens/login'
import Home from './src/screens/home'
// import config from './src/common/constants.js';


const root = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Home
  },
  {
    initialRouteName: 'Loading'
  }
)

const App = createAppContainer(root);

export default App