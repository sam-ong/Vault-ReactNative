import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { Icon, Button } from "react-native-elements";
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

            {/* image displays */}
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

            {/* row of buttons */}
            <View style={styles.buttons}>
              <Text>{"                 "}</Text>
              {/* buttons for adding/removing from already watched */}
              {this.isInAlreadyWatched(show.id) ? (
                <Icon
                  style={{ paddingRight: 100, position: "absolute" }}
                  raised
                  name="eye-check-outline"
                  type="material-community"
                  color="#f50"
                  size={18}
                  onPress={() => removeFromList("alreadyWatched", show)}
                ></Icon>
              ) : (
                <Icon
                  style={{ paddingRight: 100, position: "absolute" }}
                  raised
                  name="eye-plus-outline"
                  type="material-community"
                  color="#49b4b4"
                  size={18}
                  onPress={() => addToList("alreadyWatched", show)}
                ></Icon>
              )}
              <Text>{"           "}</Text>
              {/* buttons for adding/removing from watch list */}
              {this.isInWatchList(show.id) ? (
                <Icon
                  style={{ paddingRight: 100, position: "absolute" }}
                  raised
                  name="check"
                  type="feather"
                  color="#f50"
                  size={18}
                  onPress={() => removeFromList("watchList", show)}
                ></Icon>
              ) : (
                <Icon
                  style={{ paddingRight: 100, position: "absolute" }}
                  raised
                  name="plus"
                  type="feather"
                  color="#49b4b4"
                  size={18}
                  onPress={() => addToList("watchList", show)}
                ></Icon>
              )}
              <Text>{"           "}</Text>
              {/* button to view episode list */}
              <Icon
                raised
                name="align-left"
                type="feather"
                color="#49b4b4"
                size={18}
                onPress={() =>
                  this.props.navigation.push("EpisodeList", { show })
                }
              ></Icon>
            </View>

            {/* shows description including title, air year and overview */}
            <View style={styles.description}>
              <Text style={styles.title}>{show.name}</Text>
              <Text style={styles.year}>{airDate} </Text>
              <Text style={styles.overview}>{show.overview}</Text>
              <Button
                rounded
                buttonStyle={{
                  paddingVertical: 15,
                  backgroundColor: '#FFF',
                  borderColor: '#C9C9C9',
                  borderWidth: 1,
                 
                }}
                style={styles.button}
                title="View recommended shows"
                titleStyle={{ 
                  fontFamily: fonts.AvenirHeavy, 
                  color: '#575757',
                  fontSize: 15
                }}
                onPress={() =>
                  this.props.navigation.push("ViewRecommended", { show })
                }
              />
              <Button
              rounded
              buttonStyle={{
                paddingVertical: 15,
                backgroundColor: '#FFF',
                borderColor: '#C9C9C9',
                borderWidth: 1,
               
              }}
              style={styles.button}
              title="View similar shows"
              titleStyle={{ 
                fontFamily: fonts.AvenirHeavy, 
                color: '#575757',
                fontSize: 15
              }}
                onPress={() =>
                  this.props.navigation.push("ViewSimilar", { show })
                }
              />
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
    top: 50,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#FFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 7 }, // change this for more shadow
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 1 // ensure shadow gets rendered
  },
  description: {
    zIndex: 0,
    backgroundColor: "#FAFAFA",
    paddingVertical: 50,
    paddingHorizontal: 35,
    top: 50,
    flex: 1,
    alignSelf: "stretch",
    paddingBottom: 100
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
    marginBottom: 50,
    fontFamily: fonts.AvenirRegular
  },
  button: {
    marginBottom: 20,
  }
});
