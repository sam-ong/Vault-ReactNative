import React, { Component } from "react";
import { Text, TextInput, View, ActivityIndicator } from 'react-native'
import { Button } from "react-native-elements";
import styles from './style'
import firebase from 'react-native-firebase';

export default class ChangePassword extends Component {
    state = { currPassword: '', newPassword: '', confirmNewPassword: '', errorMessage: null, loading: false, success: false }

    handleChangePassword = () => {
        if (this.state.currPassword == this.state.newPassword) {
            this.setState({ errorMessage: "You have to choose a new password" })
            return;
        }
        else if (this.state.newPassword != this.state.confirmNewPassword) {
            this.setState({ errorMessage: "Your passwords don't match" })
            return;
        }

        this.verifyPassword(this.state.currPassword).then(
            (u) => {
                this.setState({ loading: true })
                this.updatePassword(this.state.newPassword).then(
                    (u) => {
                        this.setState({ success: true, loading: false })
                    },
                    (error) => {
                        this.setState({ errorMessage: error.message, success: false, loading: false })
                        return;
                    }
                )
            },
            (error) => {
                this.setState({ errorMessage: error.message, success: false, loading: false })
                return;
            }
        )
    }

    updatePassword = (password) => {
        return firebase.auth().currentUser.updatePassword(password)
    }

    verifyPassword = (password) => {
        user = firebase.auth().currentUser
        credential = firebase.auth.EmailAuthProvider.credential(user.email, password)
        return user.reauthenticateWithCredential(credential)
    }

    render() {
        const { errorMessage, loading, success } = this.state
        return (
            <View style={styles.container}>
            
          
                <TextInput
                    secureTextEntry
                    placeholder="Current password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={currPassword => this.setState({ currPassword })}
                    value={this.state.currPassword}
                />
                <TextInput
                    secureTextEntry
                    placeholder="New password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={newPassword => this.setState({ newPassword })}
                    value={this.state.newPassword}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Confirm password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={confirmNewPassword => this.setState({ confirmNewPassword })}
                    value={this.state.confirmNewPassword}
                />
                 <Button 
         buttonStyle={ styles.button }
         title="CHANGE PASSWORD" 
         titleStyle= {styles.buttonTitle}
         onPress={this.handleChangePassword} />
               {errorMessage && !loading && !success &&
                    <Text style={ styles.errorMessage }>
                        {this.state.errorMessage}
                    </Text>}
                {loading && <ActivityIndicator />}
                {success && <Text style={styles.successMessage}>Succesfully changed password!</Text>}
               
            </View>
        )
    }
}
