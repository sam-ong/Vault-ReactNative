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
          onPress={() => this.props.navigation.navigate('About')}
          title="About"
          color="#841584"
          accessibilityLabel="About"
        />
        <Button
          onPress={() => this.props.navigation.navigate('ChangePassword')}
          title="Change password"
          color="#841584"
          accessibilityLabel="Change password"
        />
      </View>
    )
  }
}

export function logout() {
  firebase.auth().signOut()
    .then(() => this.props.navigation.navigate('Login'))
    .catch(error => console.log(error.message))
}
