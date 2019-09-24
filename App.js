import React, { Icon } from "react";
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Loading from "./src/screens/loading";
import SignUp from "./src/screens/signup";
import Login from "./src/screens/login";
import Home from "./src/screens/home";
import Discover from "./src/screens/discover";
import Search from "./src/screens/search";
import ShowDetails from "./src/screens/showDetails";
import Settings from "./src/screens/settings";
import About from "./src/screens/about";
import ViewRecommended from "./src/screens/viewRecommended";
import ViewSimilar from "./src/screens/viewsimilar";
import EpisodeList from "./src/screens/episodelist";
import EpisodeDetails from "./src/screens/episodedetails";
import ChangePassword from "./src/screens/changepassword";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const initialLogin = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login
  },
  {
    initialRouteName: "Loading"
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={28} color={tintColor} />
        )
      }
    },
    Discover: {
      screen: Discover,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="compass" size={28} color={tintColor} />
        )
      }
    },
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="search" size={25} color={tintColor} />
        )
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="cog" size={25} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: "#51cfb1",
      inactiveTintColor: "#B0B0B0",
      style: {
        height: 45,
        paddingVertical: 10,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: -5 }, // change this for more shadow
        shadowOpacity: 0.1,
        shadowRadius: 2,
        zIndex: 1 // ensure shadow gets rendered
      },

    },
    navigationOptions: {
      title: "Vault"
    }
  }
);

const ShowsNavigator = createStackNavigator({
  TabNavigator,
  ShowDetails,
  ViewRecommended: {
    screen: ViewRecommended,
    navigationOptions: {
      title: "Recommended shows"
    }
  },
  ViewSimilar: {
    screen: ViewSimilar,
    navigationOptions: {
      title: "Similar shows"
    }
  },
  EpisodeList,
  EpisodeDetails,
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: {
      title: "Change password"
    }
  },
  About
});

const AppNavigator = createSwitchNavigator(
  {
    initialLogin,
    ShowsNavigator
  },
  {
    initialRouteName: "initialLogin"
  }
);

const App = createAppContainer(AppNavigator);

export default App;
