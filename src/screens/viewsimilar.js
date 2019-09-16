import React from 'react'
import { FlatList, View, ActivityIndicator } from 'react-native'
import { renderShowItem } from '../components/shows'
import { fetchSimilarShows } from '../api/shows'
export default class ViewSimilar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            results: [],
            loading: true
        };
    }

    componentDidMount() {
        this._fetchAllShows()
    }

    async selectionHandler() {
        await this.setState({ page: 1, loading: true })
        this._fetchAllShows()
    }

    _handleLoadMore = () => {
        this.setState(
            (prevState, nextProps) => ({
                page: prevState.page + 1
            })
        );

        this._fetchAllShows();
    };

    _fetchAllShows = () => {
        const { page } = this.state;
        const show = this.props.navigation.getParam('show');

        fetchSimilarShows({ show: show, page: page }).then(data => {
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
        return (
            <View style={{ flex: 1 }}>

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


            </View>
        );
    }
}
