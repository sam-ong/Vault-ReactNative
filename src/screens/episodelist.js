import React from 'react'
import {   StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import { getSeason } from '../api/shows'
import { renderSeasonItem } from '../components/shows'
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
        this._isMounted = true;
        for (let season of this.state.show.seasons) {            
            getSeason({ id: this.state.show.id, season: season.season_number }).then(
                data => {
                    seasons = this.state.seasons;
                    seasons[season.season_number] = data;
                    if (this._isMounted) {
                        this.setState((prevState, nextProps) => ({
                            seasons: seasons,
                        }));
                    }
                },
                err => {
                    console.log("Something went wrong");
                }
            );
        }
        this.setState({ loading: false })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { seasons, loading } = this.state;
        return (
            <View style={{ flex: 1 }}>
                {loading ?
                    <ActivityIndicator /> :
                    <FlatList style={ styles.list } 
                        data={seasons}
                        renderItem={(data) => renderSeasonItem(this.props, data)}
                        keyExtractor={(item) => {
                            //To check for undefined values in list
                            if(item) {
                                return item.id.toString()
                            } 
                            //To get rid of the not unique key error
                            else {
                                return '_' + Math.random().toString(36).substr(2, 9);
                            }
                        }}
                    />
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    list: {
    
    },
   
  });
  