import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

export default class Loading extends React.Component {
  render() {
    return (
      <View style={styles.container}><Text style={{color:'#e93766', fontSize: 40}}>Loading</Text><ActivityIndicator color='#e93766' size="large" /></View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})