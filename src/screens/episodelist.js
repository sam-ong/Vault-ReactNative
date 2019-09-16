import React from 'react'
import { StyleSheet, Button, View, FlatList, ActivityIndicator } from 'react-native'
import { getSeason } from '../api/shows'
import {renderSeasonItem} from '../components/shows'

export default class EpisodeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.navigation.getParam('show'),
            loading: true,
            seasons: [],
        };
    }

    componentDidMount() {
        for (let season of this.state.show.seasons) {
            getSeason({ id: this.state.show.id, season: season.season_number }).then(
                data => {
                    seasons = this.state.seasons;
                    seasons[season.season_number] = data;
                    this.setState((prevState, nextProps) => ({
                        seasons: [...seasons],
                        loading: false
                    }));
                },
                err => {
                    console.log("Something went wrong");
                }
            );
        }
        this.setState({ loading: false })
    }

    getEpisodes(seasonNum) {
        this.season = this.seasons[seasonNum];
        if (this.season) {
            this.episodes = this.season.episodes;
            return this.episodes;
        }
    }

    getEpisodeDetails(show, season, episode) {
        debugger;
        this.props.navigation.push(EpisodeDetailsPage, {
            show: show,
            season: season,
            episode: episode
        });
    }

    debug() {
        debugger;

    }

    render() {
        const { seasons, loading } = this.state;
        return (
            <View style={{ flex: 1 }}>
                {loading ?
                    <ActivityIndicator /> :
                    <FlatList
                        data={seasons}
                        renderItem={(data) => renderSeasonItem(this.props, data)}
                        keyExtractor={(item) => `${item.id}`}
                    />
                }

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