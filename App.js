import React, {Component} from 'react';
import { createSwitchNavigator, createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import Loading from './src/screens/loading'
import SignUp from './src/screens/signup'
import Login from './src/screens/login'
import Home from './src/screens/home'
import Discover from './src/screens/discover'
import Search from './src/screens/search'
import ShowDetails from './src/screens/showDetails'
import Settings from './src/screens/settings'

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
    Search: Search,
    Settings: Settings
  }
)

const ShowsNavigator = createStackNavigator(
  {
    TabNavigator,
    ShowDetails
  }
)

const AppNavigator = createSwitchNavigator(
  {
    initialLogin,
    ShowsNavigator
  },
  {
    initialRouteName: 'initialLogin'
  }
)

const App = createAppContainer(AppNavigator);

export default App
