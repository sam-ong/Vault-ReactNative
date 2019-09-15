import React from 'react'
import firebase from 'react-native-firebase';
import styles from './style'
import {Button, View} from 'react-native';

export default class Settings extends React.Component {
  constructor() {
    super();
    this.unsubscribe = null;
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        this.props.navigation.navigate(user ? 'Home' : 'Login')
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={logout}
          title="Logout"
          color="#841584"
          accessibilityLabel="Logout"
        />
        <Button
          onPress={about}
          title="About"
          color="#841584"
          accessibilityLabel="About"
        />
      </View>
    )
  }
}

export function settings() {
  this.props.navigation.navigate('About')
}

export function logout() {
  firebase.auth().signOut()
    .then(() => this.props.navigation.navigate('Login'))
    .catch(error => console.log(error.message))
}