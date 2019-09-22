import React from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import styles from './style'
import firebase from 'react-native-firebase';
import { Button } from "react-native-elements";


export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    firebase
     .auth()
     .signInWithEmailAndPassword(this.state.email, this.state.password)
     .then(() => this.props.navigation.navigate('Home'))
     .catch(error => this.setState({ errorMessage: error.message }))
  }
  render() {
    return (
      <View style={styles.container}>
             <Image
          style={{width: 180, height: 180, marginBottom: 50}}
          source={require("../../assets/images/logo.png")}
        />
      
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button 
         buttonStyle={ styles.button }
         title="LOG IN" 
         titleStyle= {styles.buttonTitle}
         onPress={this.handleLogin} />
           {this.state.errorMessage &&
          <Text style={ styles.errorMessage }>
            {this.state.errorMessage}
          </Text>}
        <View>
        <Text style= { styles.missing }>Don't have an account?<Text onPress={() => this.props.navigation.navigate('SignUp')} style={{color:'#51cfb1'}}> Sign Up </Text></Text>
        </View>
      </View>
    )
  }
}