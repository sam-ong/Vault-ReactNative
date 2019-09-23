import React from "react";
import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";
import DropdownMenu from "react-native-dropdown-menu";
import { renderShowItem } from "../components/shows";
import { fetchDiscoverResults } from "../api/search";
import { fonts } from "../utils/fonts";

export default class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: "Popular",
      page: 1,
      results: [],
      loading: true
    };
  }

  static navigationOptions = {
    title: "Details"
  };

  mapSelectionUrl(selection) {
    switch (selection) {
      case "Popular":
        return "popularity.desc";
      case "Newest":
        return "release_date.desc";
      case "Oldest":
        return "release_date.asc";
      case "Top rated":
        return "vote_average.desc";
    }
  }

  componentDidMount() {
    selected = this.mapSelectionUrl(this.state.selection);
    this._fetchAllShows(selected);
  }

  async selectionHandler(selected) {
    await this.setState({ selection: selected, page: 1, loading: true });
    selected = this.mapSelectionUrl(selected);
    this._fetchAllShows(selected);
  }

  _handleLoadMore = () => {
    this.setState((prevState, nextProps) => ({
      page: prevState.page + 1
    }));
    selected = this.mapSelectionUrl(this.state.selection);

    this._fetchAllShows(selected);
  };

  // get shows sorted by given criteria
  _fetchAllShows = selected => {
    const { page } = this.state;

    fetchDiscoverResults({ page: page, sort_by: selected })
      .then(data => {
        results = data.results.filter(t => t.poster_path != null);

        this.setState((prevState, nextProps) => ({
          results: page === 1 ? results : [...this.state.results, ...results],
          loading: false
        }));
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { results, loading } = this.state;
    // different sorting criteria
    var data = [["Popular", "Newest", "Oldest", "Top rated"]];
    return (
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <DropdownMenu
            style={styles.menu}
            bgColor={"white"}
            tintColor={"#666666"}
            activityTintColor={"#49b4b4"}
            titleStyle={{ fontFamily: fonts.AvenirRegular, fontSize: 20 }}
            handler={(selection, row) =>
              this.selectionHandler(data[selection][row])
            }
            data={data}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <FlatList // grid view of returned shows
                data={results}
                renderItem={data => renderShowItem(this.props, data)}
                numColumns={2}
                keyExtractor={item => item.id}
                onEndReached={this._handleLoadMore}
                onEndReachedThreshold={0.5}
              />
            )}
          </DropdownMenu>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10
  },
  menu: {
    flex: 1,
    fontSize: 20,
    paddingVertical: 15,
    marginTop: 20
  }
});
