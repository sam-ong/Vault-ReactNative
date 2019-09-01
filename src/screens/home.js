import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import firebase from 'react-native-firebase';

export default class Home extends React.Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;

    this.state = {
      currentUser: null,
      unsuscribe: null,
      loading: true,
      watchList: [],
      alreadyWatched: []
    }
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser: currentUser })

    this.unsubscribe = this.ref.doc(currentUser.uid).onSnapshot(doc => {
      this.setState({ watchList: doc.data().watchList })
      this.setState({ alreadyWatched: doc.data().alreadyWatched })
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { currentUser } = this.state
    return (
      <View style={styles.container}>
        <Text>Hi {currentUser && currentUser.email}!</Text>
        <Button
          onPress={this.logout}
          title="Logout"
          color="#841584"
          accessibilityLabel="Logout"
        />
      </View>
    )
  }

  logout() {
    firebase.auth().signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => console.log(error.message))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})