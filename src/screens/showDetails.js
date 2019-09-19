import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { Icon } from "react-native-elements";
import { fetchShowInfo } from "../api/shows";
import { getW500ImageUrl } from "../api/urls";
import { addToList, removeFromList } from "../components/shows";
import { fonts } from "../utils/fonts";
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
      var airDate = show.first_air_date.substring(0, 4);
      return (
        <ScrollView>
          <View style={styles.container}>
            {/* <Text>{show.name}</Text> */}
            <View style={styles.images}>
              <Image
                source={{ uri: getW500ImageUrl(show.backdrop_path) }}
                style={styles.backdrop}
              />
              <Image
                source={{ uri: getW500ImageUrl(show.poster_path) }}
                style={styles.poster}
              />
            </View>
            <View style={styles.buttons}>
            {/* buttons for adding/removing from already watched */}
              {this.isInAlreadyWatched(show.id) ? (
                    <Icon
                    raised
                    name="eye-check-outline"
                    type="material-community"
                    color="#f50"
                    size={15}
                    onPress={() => removeFromList("alreadyWatched", show)}
                  ></Icon>
                 ) : (
                   <Icon
                   raised
                   name="eye-plus-outline"
                   type="material-community"
                   color="#49b4b4"
                   size={15}
                   onPress={() => addToList("alreadyWatched", show)}
                 ></Icon>
              )}

                   {/* buttons for adding/removing from watch list */}
                {this.isInWatchList(show.id) ? (
                 <Icon
                 raised
                 name="check"
                 type="feather"
                 color="#f50"
                 size={15}
                 onPress={() => removeFromList("watchList", show)}
               ></Icon>
              ) : (
                <Icon
                raised
                name="plus"
                type="feather"
                color="#49b4b4"
                size={15}
                onPress={() => addToList("watchList", show)}
              ></Icon>
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

              <Text style={styles.title}>{show.name}</Text>

              <Text style={styles.year}>{airDate} </Text>
              <Text style={styles.overview}>{show.overview}</Text>
            </View>
          </View>
        </ScrollView>
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
  images: {
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },

    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9
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
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between"
    // borderBottomColor: "#000",
    // borderBottomWidth: 3,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    // elevation: 7
  },
  description: {
    backgroundColor: "#FAFAFA",
    paddingVertical: 30,
    paddingHorizontal: 35,
    top: 50,
    flex: 1,
    alignSelf: "stretch"
  },
  title: {
    color: "#404040",
    fontSize: 32,
    marginBottom: 10,
    fontFamily: fonts.AvenirHeavy
  },
  year: {
    color: "#AAAAAA",
    fontSize: 20,
    fontFamily: fonts.AvenirHeavy
  },
  overview: {
    color: "#4f4f4f",
    fontSize: 17,
    lineHeight: 30,
    marginTop: 30,
    marginBottom: 100,
    fontFamily: fonts.AvenirRegular
  }
});
