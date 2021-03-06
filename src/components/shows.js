import React from "react";
import { getW500ImageUrl } from "../api/urls";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import firebase from "react-native-firebase";
import style from "../screens/style";
import { fonts } from "../utils/fonts";

//Show image thumbnail for grid view
export const renderShowItem = (props, data) => {
  const { navigate } = props.navigation;

  return (
    <TouchableOpacity
      style={{ backgroundColor: "transparent" }}
      onPress={() => navigate("ShowDetails", { id: data.item.id })}
    >
      <View style={styles.listItemContainer}>
        <Image
          source={{ uri: getW500ImageUrl(data.item.poster_path) }}
          style={style.imageThumbnail}
        />
      </View>
    </TouchableOpacity>
  );
};

//Show image thumbnail for side swipe view
export const renderShowItemSwipe = (props, data) => {
  //function to go to next screen
  goToNextScreen = id => {
    return props.navigation.push("ShowDetails", {
      id: id
    });
  };

  return (
    <TouchableOpacity
      style={{ backgroundColor: "transparent" }}
      onPress={() => this.goToNextScreen(data.item.id)}
    >
      <View
        style={{
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 7 }, // change this for more shadow
          shadowOpacity: 0.2,
          shadowRadius: 3
        }}
      >
        <Image
          source={{ uri: getW500ImageUrl(data.item.poster_path) }}
          style={style.imageThumbnailSwipe}
        />
      </View>
      <Text style={styles.title}>{data.item.name}</Text>
      <Text style={styles.year}>
        {data.item.first_air_date.substring(0, 4)}
      </Text>
    </TouchableOpacity>
  );
};

//Display episode list
export const renderSeasonItem = (props, data) => {
  if (!data.item) return;
  episodes = data.item.episodes;

  return (
    <View style={styles.listItemContainer}>
      <Text style={styles.heading}>{data.item.name}</Text>
      <FlatList
        style={{}}
        data={episodes}
        renderItem={episodes => renderEpisodeItem(props, episodes)}
        keyExtractor={item => data.item.id + "" + item.id}
      />
    </View>
  );
};

//Display list of episodes
export const renderEpisodeItem = (props, data) => {
  goToNextScreen = episode => {
    return props.navigation.push("EpisodeDetails", {
      episode: episode,
      show: data.item
    });
  };

  return (
    <TouchableOpacity
      style={{ backgroundColor: "transparent" }}
      onPress={() => this.goToNextScreen(data.item)}
    >
      <View style={styles.episodes}>
        <Text style={styles.episodesText}>{data.item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

//Add to watch list or already watched list: "watchList" | "alreadyWatched"
export const addToList = (list, show) => {
  const { currentUser } = firebase.auth();
  docRef = firebase
    .firestore()
    .collection("users")
    .doc(currentUser.uid);

  id = show.id;
  poster_path = show.poster_path;

  docRef.set(
    {
      [list]: {
        [id]: poster_path
      }
    },
    { merge: true }
  );
};

//Remove from watch list or already watched list: "watchList" | "alreadyWatched"
export const removeFromList = (list, show) => {
  const { currentUser } = firebase.auth();
  docRef = firebase
    .firestore()
    .collection("users")
    .doc(currentUser.uid);
  docRef.update({
    [list + "." + show.id]: firebase.firestore.FieldValue.delete()
  });
};

const styles = StyleSheet.create({
  episodes: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderBottomColor: "#E6E6E6",
    borderBottomWidth: 1
  },
  episodesText: {
    color: "#363636",
    fontSize: 14,
    fontFamily: fonts.AvenirRegular
  },
  heading: {
    fontFamily: fonts.AvenirHeavy,
    paddingVertical: 18,
    paddingHorizontal: 30,
    fontSize: 20,
    color: "#4f4f4f",
    backgroundColor: "#E3E3E3"
  },
  title: {
    color: "#404040",
    fontSize: 32,
    marginTop: 10,
    marginBottom: 5,
    fontFamily: fonts.AvenirHeavy,
    maxWidth: 290,
    paddingLeft: 15
  },
  year: {
    color: "#AAAAAA",
    fontSize: 20,
    fontFamily: fonts.AvenirHeavy,
    paddingLeft: 15
  }
});
