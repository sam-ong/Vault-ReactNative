import React from "react";
import {
  TouchableOpacity,
  Image,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import firebase from "react-native-firebase";
import SegmentControl from "react-native-segment-control";
import { getW500ImageUrl } from "../api/urls";
import styles from "./style";
export default class Home extends React.Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("users");
    this.unsubscribe = null;
    this.state = {
      currentUser: null,
      loading: true,
      watchList: [],
      alreadyWatched: []
    };
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser: currentUser });

    // get the show lists of current logged in user
    this.unsubscribe = this.ref.doc(currentUser.uid).onSnapshot(doc => {
      this.setState({
        watchList: doc.data().watchList,
        alreadyWatched: doc.data().alreadyWatched,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  AlreadyWatched = () => {
    return this.ShowsList(this.state.alreadyWatched);
  };

  WatchList = () => {
    return this.ShowsList(this.state.watchList);
  };

  ShowsList = list => {
    if (this.state.loading) return <ActivityIndicator />;

    return (
      <View style={{ alignItems: "center" }}>
        <FlatList // arrange show lists in a grid view
          style={styles.grid}
          data={Object.keys(list)}
          renderItem={data => renderList(this.props, data, list)}
          numColumns={2}
          keyExtractor={item => item}
        />
      </View>
    );
  };

  render() {
    // separate lists into segments
    const segments = [
      {
        title: "Already Watched",
        view: this.AlreadyWatched
      },
      {
        title: "Watchlist",
        view: this.WatchList
      }
    ];

    // render the segments
    return (
      <View style={styles.segment}>
        <SegmentControl segments={segments} color="#51cfb1" />
      </View>
    );
  }
}

export const renderList = (props, data, list) => {
  const { navigate } = props.navigation;

  return (
    // change page to respective show details page when image touched
    <TouchableOpacity
      style={{ backgroundColor: "transparent" }}
      onPress={() => navigate("ShowDetails", { id: data.item })}
    >
      {/* display image thumbnails */}
      <View style={styles.container}>
        <Image
          source={{ uri: getW500ImageUrl(list[data.item]) }}
          style={styles.imageThumbnail}
        />
      </View>
    </TouchableOpacity>
  );
};
