import React from 'react'
import { Platform, Image, Text, View, Button, TextInput, FlatList } from 'react-native'
import { fetchSearchResults } from '../api/search'
import styles from './style'
import firebase from 'react-native-firebase';

export default class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            query: '',
            results: []
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> SEARCH </Text>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Search for a title..."
                    onChangeText={query => this.setState({ query })}
                    value={this.state.query}
                />
                <Button title="Search" color="#e93766" onPress={this.handleSearch} />

                <FlatList
                    data = {this.state.results}
                    renderItem = { ({show}) => <Text>{show.title}</Text> }
                />

            </View>
        )
    }

    handleSearch = () => {
        let query = this.state.query
        this.setState({ results: fetchSearchResults({query}).results })
        debugger;
    }
}
