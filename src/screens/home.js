import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button, FlatList, ActivityIndicator } from 'react-native'
import firebase from 'react-native-firebase';
// import SegmentedControlTab from "react-native-segmented-control-tab";
import SegmentControl from 'react-native-segment-control';

const AlreadyWatched = () => {
  return <Text style={styles.text}>This is first view</Text>;
};
const WatchList = () => {
  return <Text style={styles.text}>This is second view</Text>;
};

const ShowsList = () => {
  // let l = this.loading;
  // let list = this.list;
  // console.log(l);
  // console.log(list);
  // debugger;

  if (this.loading) {
    return <Text style={styles.text}>LOADING</Text>;
    return <ActivityIndicator />;
  }
  else {

    return <Text style={styles.text}>LOADED</Text>;
    // return <FlatList
    //   data={this.list}
    //   renderItem={(data) => renderShowItem(this.props, data)}
    //   numColumns={2}
    //   keyExtractor={(item) => item.id}
    // />
  };
}


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

  render() {
    const { currentUser, loading, watchList, alreadyWatched } = this.state
    const segments = [
      {
        title: 'Already watched',
        view: ShowsList,
        loading: loading,
        list: watchList
      },
      {
        title: 'Watchlist',
        view: ShowsList,
        loading: loading,
        list: alreadyWatched
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