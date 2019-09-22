import React from 'react'
import { FlatList, View, ActivityIndicator, Dimensions, Card, Badge } from 'react-native'
import { renderShowItemSwipe } from '../components/shows'
import { fetchShowRecommendations } from '../api/shows'
import SideSwipe from 'react-native-sideswipe';
import { Carousel, AnimatedCarouselItem } from 'react-native-sideswipe'; 
import styles from './style'

export default class ViewRecommended extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            results: [],
            loading: true,
            currentIndex: 0,
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

        fetchShowRecommendations({ show: show, page: page }).then(data => {
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
        const { width } = Dimensions.get('window');
        return (
            <View style={styles.container}>

                {/* {loading ? (
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
                } */}

<SideSwipe
        index={this.state.currentIndex}

  style={{ width, maxHeight: 500 }}
          itemWidth={width - 60}
          threshold={80}
          contentOffset={12}
        data={results}
        onIndexChange={index =>
          this.setState(() => ({ currentIndex: index }))
        }
        renderItem={(data) => renderShowItemSwipe(this.props, data)}
      />
            </View>
        );
    }
}
