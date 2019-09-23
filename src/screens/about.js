import React from "react";
import styles from "./style";
import { Text, View } from "react-native";

export default class About extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.aboutText}> 
          This app was made with lots of hours of programing, designing,
          testing, planning, and late nights.
        </Text>
        <Text></Text>
        <Text style={styles.aboutText}>
          Thank you for supporting our app. Enjoy!
        </Text>
      </View>
    );
  }
}
