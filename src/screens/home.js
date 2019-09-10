import React from 'react'
import { StyleSheet, Platform, TouchableOpacity, Image, Text, View, Button, FlatList, ActivityIndicator } from 'react-native'
import firebase from 'react-native-firebase';
import SegmentControl from 'react-native-segment-control';
import { getW500ImageUrl } from '../api/urls';

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
      this.setState({
        watchList: doc.data().watchList,
        alreadyWatched: doc.data().alreadyWatched,
        loading: false
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  AlreadyWatched = () => {
    return this.ShowsList(this.state.alreadyWatched)
  };

  WatchList = () => {
    return this.ShowsList(this.state.watchList)
  };

  ShowsList = (list) => {
    return <FlatList
      data={Object.keys(list)}
      renderItem={(data) => renderList(this.props, data, list)}
      numColumns={2}
      keyExtractor={(item) => item}
    />
  }

  render() {
    const { currentUser, loading, watchList } = this.state
    const segments = [
      {
        title: 'Already watched',
        view: this.AlreadyWatched
      },
      {
        title: 'Watchlist',
        view: this.WatchList
      }
    ]

    return (
      <View style={styles.container}>
        <Text>Hi {currentUser && currentUser.email}!</Text>
        <Button
          onPress={this.logout}
          title="Logout"
          color="#841584"
          accessibilityLabel="Logout"
        />
        <SegmentControl segments={segments} />
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


export const renderList = (props, data, list) => {
  const { navigate } = props.navigation;
  //function to go to next screen
  goToNextScreen = (id) => {
    return navigate('ShowDetails', {
      id: id,
    });
  }
  
  return <TouchableOpacity style={{ backgroundColor: 'transparent' }} onPress={() => this.goToNextScreen(data.item)}>
    <View style={styles.listItemContainer}>
    <Text> {data.item}</Text>
      <Image source={{ uri: getW500ImageUrl(list[data.item]) }}
        style={styles.imageThumbnail} />
    </View>
  </TouchableOpacity>
}