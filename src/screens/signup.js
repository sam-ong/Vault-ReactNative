import React, { Component } from "react";
import { Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import styles from './style'
import firebase from 'react-native-firebase';
export default class SignUp extends Component {
  state = { email: '', password: '', errorMessage: null }

  handleSignUp = () => {
    user = firebase.auth();
    firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((data) => {
        this.addToDatabase(data.user.email, data.user.uid)
        this.props.navigation.navigate('Discover')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  addToDatabase(email, uid) {
    docRef = firebase.firestore().collection("users").doc(uid);

    docRef
      .set({
        email: email,
        watchList: [],
        alreadyWatched: []
      }).then(() => {
        console.log("Document written with ID: ", uid)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#e93766', fontSize: 40 }}>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" color="#e93766" onPress={this.handleSignUp} />
        <View>
          <Text> Already have an account? <Text onPress={() => this.props.navigation.navigate('Login')} style={{ color: '#e93766', fontSize: 18 }}> Login </Text></Text>
        </View>
      </View>
    )
  }
}
