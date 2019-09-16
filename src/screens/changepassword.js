import React, { Component } from "react";
import { Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import styles from './style'
import firebase from 'react-native-firebase';

export default class ChangePassword extends Component {
    state = { currPassword: '', newPassword: '', confirmNewPassword: '', errorMessage: null }

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
                this.updatePassword(this.state.newPassword).then(
                    (u) => {
                        // this.navCtrl.setRoot(TabsPage, { tabIndex: 3 })
                        this.setState({ errorMessage: "PASSWORD SUCCESFULLY CHANGED" })
                    },
                    (error) => {
                        this.setState({ errorMessage: error.message })
                        return;
                    }
                )
            },
            (error) => {
                this.setState({ errorMessage: error.message })
                return;
            }
        )


        // firebase.auth()
        //   .createUserWithEmailAndPassword(this.state.email, this.state.password)
        //   .then((data) => {
        //     this.addToDatabase(data.user.email, data.user.uid)
        //     this.props.navigation.navigate('Discover')
        //   })
        //   .catch(error => this.setState({ errorMessage: error.message }))
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
        return (
            <View style={styles.container}>
                <Text style={{ color: '#e93766', fontSize: 40 }}>Change password</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
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
                <Button title="Change password" color="#e93766" onPress={this.handleChangePassword} />
            </View>
        )
    }
}
