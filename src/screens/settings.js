import React from "react";
import firebase from "react-native-firebase";
import { View, Alert, StyleSheet, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import { fonts } from "../utils/fonts";

export default class Settings extends React.Component {
  constructor() {
    super();
    this.unsubscribe = null;
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "Home" : "Login");
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text 
        style= { styles.title }  >{"ABOUT"}</Text>

        <Button
          iconRight
          title="    About"
          icon={
            <Icon
              name="chevron-right"
              type="font-awesome"
              size={15}
              color="#575757"
            />
          }
          buttonStyle={ styles.button }
          titleStyle={{
            fontFamily: fonts.AvenirHeavy,
            color: "#6E6E6E",
            fontSize: 15
          }}
        />


<View style={styles.version}>

<Text style= { { fontFamily: fonts.AvenirHeavy,color: "#6E6E6E",
            fontSize: 15, paddingLeft: 5 } } >{"Version"}</Text>
<Text style= {{ fontFamily: fonts.AvenirRegular, color: "#8A8A8A" }} >{"2.0"}</Text>

</View>





     

        <Text style= { styles.title } >{"ACCOUNT"}</Text>

        <Button
          iconRight
          title="    Change password"
          icon={
            <Icon
              name="chevron-right"
              type="font-awesome"
              size={15}
              color="#575757"
            />
          }
          buttonStyle={ styles.button }
          titleStyle={{
            fontFamily: fonts.AvenirHeavy,
            color: "#6E6E6E",
            fontSize: 15
          }}
          onPress={() => this.props.navigation.navigate("ChangePassword")}
        />

 

<Button
          iconRight
          title="    Logout"
          buttonStyle={ styles.button }
          titleStyle={{
            fontFamily: fonts.AvenirHeavy,
            color: "#1B9CFC",
            fontSize: 15
          }}
          onPress={logout}
        />
    

    <Button
          iconRight
          title="    Delete account"
          buttonStyle={ styles.button }
          titleStyle={{
            fontFamily: fonts.AvenirHeavy,
            color: "#f53b57",
            fontSize: 15
          }}
          onPress={deleteAccount}
        />
    


       

        
      </View>
    );
  }
}

export function deleteAccount() {
  Alert.alert(
    "Confirm delete",
    "Are you sure you want to permanently delete your account?",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Yes",
        onPress: () => {
          deleteUserDetails();
          deleteAuthAccount();
        }
      }
    ],
    { cancelable: false }
  );
}

export function deleteUserDetails() {
  this.ref = firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUID);
  ref
    .delete()
    .then(function() {
      console.log("User data successfully deleted!");
    })
    .catch(function(error) {
      console.error("Error deleting data: ", error);
    });
}

export function deleteAuthAccount() {
  firebase
    .auth()
    .currentUser.delete()
    .then(function() {
      alert("Successfully deleted account.");
    })
    .catch(function(error) {
      console.error("Error deleting account: " + error.message);
    });
}

export function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => this.props.navigation.navigate("Login"))
    .catch(error => console.log(error.message));
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontFamily: fonts.AvenirHeavy,
    fontSize: 15,
    letterSpacing: 3,
    color: "#404040",
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  version: {
    justifyContent: "space-between",
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 20,
    borderBottomColor: "#C9C9C9",
    borderBottomWidth: 0.5,
  },
  button: {
    paddingVertical: 15,
    backgroundColor: "#FFF",
    borderBottomColor: "#C9C9C9",
    borderBottomWidth: 0.5,
    justifyContent: "space-between"
  }
});
