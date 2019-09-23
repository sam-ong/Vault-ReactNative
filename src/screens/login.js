import React from "react";
import { Image, Text, TextInput, View } from "react-native";
import styles from "./style";
import firebase from "react-native-firebase";
import { Button } from "react-native-elements";

export default class Login extends React.Component {
  state = { email: "", password: "", errorMessage: null };
  handleLogin = () => {
    // consolidate firestore for auth
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("Home"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };
  render() {
    return (
      // display logo on top
      <View style={styles.container}>
        <Image
          style={{ width: 180, height: 180, marginBottom: 50 }}
          source={require("../../assets/images/logo.png")}
        />

        {/* first field, email */}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />

        {/* second field, password */}
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />

        {/* login button */}
        <Button
          buttonStyle={styles.button}
          title="LOG IN"
          titleStyle={styles.buttonTitle}
          onPress={this.handleLogin}
        />

        {/* display error message in the event of login error */}
        {this.state.errorMessage && (
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        )}
        <View>
          {/* link to sign up screen  */}
          <Text style={styles.missing}>
            Don't have an account?
            <Text
              onPress={() => this.props.navigation.navigate("SignUp")}
              style={{ color: "#51cfb1" }}
            >
              {" Sign Up"}
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}
