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
            page: 1,
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
                        renderItem={(data) => renderShowItem(this.props, data)}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        onEndReached={this._handleLoadMore}
                        onEndReachedThreshold={0.5} />)
                }
            </View>
        )
    }

    _handleLoadMore = () => {
        this.setState(
            (prevState, nextProps) => ({
                page: prevState.page + 1
            })
        );

        this.fetchResults();
    };

    async handleSearch() {
        await this.setState({ loading: true, page: 1 })
        this.fetchResults();
    }

    fetchResults() {
        const { query, page } = this.state
        fetchSearchResults({ page, query }).then(data => {
            results = data.results.filter(t => t.poster_path != null);
            this.setState((prevState, nextProps) => ({
                results:
                    page === 1
                        ? results
                        : [...this.state.results, ...results],
                loading: false
            }));
        })
    }
}

