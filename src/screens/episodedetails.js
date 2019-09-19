import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { getW500ImageUrl } from "../api/urls";
import { fonts } from "../utils/fonts";

export default class EpisodeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episode: this.props.navigation.getParam("episode")
    };
  }

  render() {
    const { episode } = this.state;
    if (episode) {

      // make the date representation more human-readable
      Date.prototype.makeDate = function() {
        var mm = this.toLocaleString('default', { month: 'long' });
        var dd = this.getDate();
        return [mm, (dd>9 ? '' : '0') + dd + ',', this.getFullYear(),].join(' ');
      };
      var date = new Date(episode.air_date);
    
      return (
        <ScrollView>
        <View style={styles.container}>
          <Image
            source={{ uri: getW500ImageUrl(episode.still_path) }}
            style={styles.backdrop}
          />
          <View style={styles.description}>
            <Text style={styles.title}>{episode.name}</Text>
            <Text style={styles.year}>{date.makeDate()} </Text>
            <Text style={styles.overview}>{episode.overview}</Text>
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
    justifyContent: "center",
    alignItems: "center",
    color: "#4f4f4f",
  },
  backdrop: {
    width: 400,
    minHeight: 250
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
    marginBottom: 150,
    fontFamily: fonts.AvenirRegular
  }
});
