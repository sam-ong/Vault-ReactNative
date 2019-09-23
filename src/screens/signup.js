import React, { Component } from "react";
import { Text, TextInput, View, Image } from "react-native";
import { Button } from "react-native-elements";
import styles from "./style";
import firebase from "react-native-firebase";
export default class SignUp extends Component {
  state = { email: "", password: "", errorMessage: null };

  handleSignUp = () => {
    user = firebase.auth();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => {
        this.addToDatabase(data.user.email, data.user.uid);
        this.props.navigation.navigate("Discover");
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  // add new account entry to firestore db
  addToDatabase(email, uid) {
    docRef = firebase
      .firestore()
      .collection("users")
      .doc(uid);
    docRef
      .set({
        email: email,
        watchList: [],
        alreadyWatched: []
      })
      .then(() => {
        console.log("Document written with ID: ", uid);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* place logo at the tp[] */}
        <Image
          style={{ width: 180, height: 180, marginBottom: 50 }}
          source={require("../../assets/images/logo.png")}
        />

        {/* first field, email */}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />

        {/* second field, password */}
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />

        {/* signup button */}
        <Button
          buttonStyle={styles.button}
          title="SIGN UP"
          titleStyle={styles.buttonTitle}
          onPress={this.handleSignUp}
        />

        {/* display error message in the event of signup error */}
        {this.state.errorMessage && (
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        )}
        <View>
          {/* link to sign up screen  */}
          <Text style={styles.missing}>
            Already have an account?
            <Text
              onPress={() => this.props.navigation.navigate("Login")}
              style={{ color: "#51cfb1" }}
            >
              {" Login"}]
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}
