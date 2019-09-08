import React from 'react'
import { Platform, StyleSheet, Image, Text, View, Button, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { fetchSearchResults } from '../api/search'
import { getW500ImageUrl } from '../api/urls'
import styles from './style'
import firebase from 'react-native-firebase';

export default class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            query: '',
            results: [],
            loading: false
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    renderItem(data) {
        return <TouchableOpacity style={{ backgroundColor: 'transparent' }}>
            <View style={styles2.listItemContainer}>
                <Text>{data.item.name}</Text>
                <Image source={{ uri: getW500ImageUrl(data.item.poster_path) }}
                    style={styles2.imageThumbnail} />
            </View>
        </TouchableOpacity>
    }

    render() {
        const { query, results, loading } = this.state;

        return (
            <View style={styles.container}>
                <Text> SEARCH </Text>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Search for a title..."
                    onChangeText={query => this.setState({ query })}
                    value={query}
                />
                <Button title="Search" color="#e93766" onPress={this.handleSearch} />
                {loading ? (
                    <ActivityIndicator />
                ) : 
                (<FlatList
                    data={results}
                    renderItem={this.renderItem}
                    numColumns={2}
                    keyExtractor={(item) => item.id} />)            
                    }
            </View>
        )
    }

    handleSearch() {
        this.setState({ loading: true })
        let query = this.state.query
        fetchSearchResults({query}).then( data => {
            this.setState({ results: data.results, loading: false })
        })
    }
}

const styles2 = StyleSheet.create({
    listItemContainer: {
        flex: 1,
        flexDirection: 'column', 
        margin: 1 
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
    },
  });
