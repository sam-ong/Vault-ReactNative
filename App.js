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
import About from './src/screens/about'
import ViewRecommended from './src/screens/viewRecommended'
import ViewSimilar from './src/screens/viewsimilar'
import EpisodeList from './src/screens/episodelist'
import EpisodeDetails from './src/screens/episodedetails'

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
    ShowDetails,
    ViewRecommended,
    ViewSimilar,
    EpisodeList,
    EpisodeDetails,
    About
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
