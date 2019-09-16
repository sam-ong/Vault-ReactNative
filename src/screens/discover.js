import React from 'react'
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native'
import DropdownMenu from 'react-native-dropdown-menu';
import { renderShowItem } from '../components/shows'
import { fetchDiscoverResults } from '../api/search'

export default class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: 'Popular',
      page: 1,
      results: [],
      loading: true
    };
  }

  mapSelectionUrl(selection) {
    switch (selection) {
      case "Popular":
        return "popularity.desc"
      case "Newest":
        return "release_date.desc"
      case "Oldest":
        return "release_date.asc"
      case "Top rated":
        return "vote_average.desc"
    }
  }

  componentDidMount() {
    selected = this.mapSelectionUrl(this.state.selection)
    this._fetchAllShows(selected)
  }

  async selectionHandler(selected) {
    await this.setState({selection: selected, page: 1, loading: true})
    selected = this.mapSelectionUrl(selected)
    this._fetchAllShows(selected)
  }

  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1
      })
    );
    selected = this.mapSelectionUrl(this.state.selection)

    this._fetchAllShows(selected);
  };

  _fetchAllShows = (selected) => {
    const { page } = this.state;

    fetchDiscoverResults({ page: page, sort_by: selected }).then(data => {
      results = data.results.filter(t => t.poster_path != null);

      this.setState((prevState, nextProps) => ({
        results:
          page === 1
            ? results
            : [...this.state.results, ...results],
        loading: false
      }));

    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    const { results, loading } = this.state;
    var data = [["Popular", "Newest", "Oldest", "Top rated"]];
    return (
      <View style={{ flex: 1 }}>
        <DropdownMenu
          style={{ flex: 1 }}
          bgColor={'white'}
          tintColor={'#666666'}
          activityTintColor={'green'}
          // arrowImg={}      
          // checkImage={}   
          // optionTextStyle={{color: '#333333'}}
          // titleStyle={{color: '#333333'}} 
          // maxHeight={300} 
          handler={(selection, row) => this.selectionHandler(data[selection][row])}
          data={data}
        >
          {loading ? (
            <ActivityIndicator />
          ) :
            (<FlatList
              data={results}
              renderItem={(data) => renderShowItem(this.props, data)}
              numColumns={2}
              keyExtractor={(item) => item.id}
              onEndReached={this._handleLoadMore}
              onEndReachedThreshold={0.5}
            />)
          }
        </DropdownMenu>

      </View>
    );
  }
}
