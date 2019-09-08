import React from 'react'
import { Text, View, Button, TextInput, FlatList, ActivityIndicator } from 'react-native'
import { fetchSearchResults } from '../api/search'
import { renderShowItem } from '../components/shows'
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
                    renderItem={renderShowItem}
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

