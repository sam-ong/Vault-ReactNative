import React from 'react'
import { StyleSheet, Image, Text, View, Button, ActivityIndicator } from 'react-native'
import { getW500ImageUrl } from '../api/urls'

export default class EpisodeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            episode: this.props.navigation.getParam('episode')
        }
    }

    render() {
        const { episode } = this.state;
        if (episode) {
            return (
                <View style={styles.container}>
                    <Text>{episode.name}</Text>
                    <Text>{episode.overview}</Text>
                    <Image source={{ uri: getW500ImageUrl(episode.still_path) }} style={styles.backdrop} />
                </View>
            );
        }
        else {
            return <ActivityIndicator />
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backdrop: {
        width: 300,
        minHeight: 200
    }
})
