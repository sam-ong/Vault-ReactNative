import React from 'react'
import { StyleSheet, Platform, FlatList, Image, Text, View, Button, ActivityIndicator } from 'react-native'
import DropdownMenu from 'react-native-dropdown-menu';
import { renderShowItem } from '../components/shows'
import { fetchDiscoverResults } from '../api/search'

export default class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: 'Popular',
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
    selection = this.mapSelectionUrl(this.state.selection)

    fetchDiscoverResults({ sort_by: selection }).then(data => {
      this.setState({ results: data.results, loading: false })
    }).catch(error => {
      console.log(error)
    })
  }

  selectionHandler(selected) {
    this.setState({ selection: selected, loading: true })

    fetchDiscoverResults({ sort_by: this.mapSelectionUrl(selected) }).then(data => {
      this.setState({ results: data.results, loading: false })
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    const { selection, results, loading } = this.state;
    var data = [["Popular", "Newest", "Oldest", "Top rated"]];
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 64 }} />
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
              renderItem={renderShowItem}
              numColumns={2}
              keyExtractor={(item) => item.id} />)
          }
        </DropdownMenu>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})