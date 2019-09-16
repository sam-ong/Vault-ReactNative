import React from 'react'
import firebase from 'react-native-firebase';
import styles from './style'
import { Button, View, Alert } from 'react-native';

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
        <Button
          onPress={deleteAccount}
          title="Delete account"
          color="#841584"
          accessibilityLabel="Delete account"
        />
      </View>
    )
  }
}

export function deleteAccount() {
  Alert.alert(
    'Confirm delete',
    'Are you sure you want to permanently delete your account?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes', onPress: () => {
          deleteUserDetails()
          deleteAuthAccount()
        }
      },
    ],
    { cancelable: false },
  );
}

export function deleteUserDetails() {
  this.ref = firebase.firestore().collection('users').doc(firebase.auth().currentUID)
  ref.delete().then(function () {
    console.log("User data successfully deleted!");
  }).catch(function (error) {
    console.error("Error deleting data: ", error);
  });
}

export function deleteAuthAccount() {
  firebase.auth().currentUser.delete().then(function () {
    alert("Successfully deleted account.")
  }).catch(function (error) {
    console.error("Error deleting account: " + error.message)
  });
}

export function logout() {
  firebase.auth().signOut()
    .then(() => this.props.navigation.navigate('Login'))
    .catch(error => console.log(error.message))
}
