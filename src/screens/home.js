import React from 'react'
import { TouchableOpacity, Image, Text, View, Button, FlatList, ActivityIndicator } from 'react-native'
import firebase from 'react-native-firebase';
import SegmentControl from 'react-native-segment-control';
import { getW500ImageUrl } from '../api/urls';
import styles from './style'

export default class Home extends React.Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;

    this.state = {
      currentUser: null,
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
    if (this.state.loading) return <ActivityIndicator />

    return <FlatList
      data={Object.keys(list)}
      renderItem={(data) => renderList(this.props, data, list)}
      numColumns={2}
      keyExtractor={(item) => item}
    />
  }

  render() {
    const { currentUser } = this.state
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
        <SegmentControl segments={segments} />
      </View>
    )
  }
}

export const renderList = (props, data, list) => {
  const { navigate } = props.navigation;
  //function to go to next screen
  goToNextScreen = (id) => {
    return navigate('ShowDetails', {
      id: id,
    });
  }

  return <TouchableOpacity style={{ backgroundColor: 'transparent' }} onPress={() => this.goToNextScreen(data.item)}>
    <View>
      <Text> {data.item}</Text>
      <Image source={{ uri: getW500ImageUrl(list[data.item]) }}
        style={styles.imageThumbnail} />
    </View>
  </TouchableOpacity>
}
