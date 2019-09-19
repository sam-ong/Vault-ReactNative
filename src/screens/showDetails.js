import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  ActivityIndicator
} from "react-native";
import { fetchShowInfo } from "../api/shows";
import { getW500ImageUrl } from "../api/urls";
import { addToList, removeFromList } from "../components/shows";
import firebase from "react-native-firebase";
export default class ShowDetails extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("users");
    id = this.props.navigation.getParam("id");

    this.state = {
      id: this.props.navigation.getParam("id"),
      show: null,
      loading: true,
      watchList: [],
      alreadyWatched: []
    };
  }

  componentDidMount() {
    this.fetchShowDetails(this.state.id);

    const { currentUser } = firebase.auth();

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

  fetchShowDetails(id) {
    fetchShowInfo({ id: id })
      .then(data => {
        this.setState({
          show: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  isInWatchList(id) {
    return this.state.watchList[id];
  }

  isInAlreadyWatched(id) {
    return this.state.alreadyWatched[id];
  }

  render() {
    const { show, loading } = this.state;
    if (show && !loading) {
var airDate = show.first_air_date.substring(0,4);
      return (
        <View style={styles.container}>
          {/* <Text>{show.name}</Text> */}
          <Image
            source={{ uri: getW500ImageUrl(show.backdrop_path) }}
            style={styles.backdrop}
          />
          <Image
            source={{ uri: getW500ImageUrl(show.poster_path) }}
            style={styles.poster}
          />

          <View style={styles.buttons}>
            {this.isInWatchList(show.id) ? (
              <Button
                title="Remove from watch list"
                onPress={() => removeFromList("watchList", show)}
              />
            ) : (
              <Button
                title="Add to watch list"
                onPress={() => addToList("watchList", show)}
              />
            )}

            {this.isInAlreadyWatched(show.id) ? (
              <Button
                title="Remove from already watched list"
                onPress={() => removeFromList("alreadyWatched", show)}
              />
            ) : (
              <Button
                title="Add to already watched"
                onPress={() => addToList("alreadyWatched", show)}
              />
            )}
          </View>
          <View style={styles.description}>
            {/* <Button
            title="View recommended shows"
            onPress={() =>
              this.props.navigation.push("ViewRecommended", { show })
            }
          />
          <Button
            title="View similar shows"
            onPress={() => this.props.navigation.push("ViewSimilar", { show })}
          />
          <Button
            title="View episode list"
            onPress={() => this.props.navigation.push("EpisodeList", { show })}
          /> */}

            <Text>{show.name}</Text>
            <Text>{airDate}</Text>
            <Text>{show.overview}</Text>

          </View>
        </View>
      );
    } else {
      return <ActivityIndicator />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  backdrop: {
    width: 400,
    minHeight: 250
  },
  poster: {
    width: 150,
    position: "absolute",
    minHeight: 215,
    top: 70,
    borderRadius: 4,
    borderWidth: 3,
    borderColor: "#FFFFFF"
  },
  buttons: {
    top: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#000",
    borderBottomWidth: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  },
  description:  {
      backgroundColor: '#FAFAFA',
      paddingVertical: 30,
      paddingHorizontal: 35,
      top: 50,
      flex: 1,
      alignSelf: 'stretch',
  }
});
