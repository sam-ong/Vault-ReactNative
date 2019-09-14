import React from 'react'
import { StyleSheet, Platform, FlatList, Image, Text, View, Button, ActivityIndicator } from 'react-native'
import { fetchShowInfo } from '../api/shows'
import { getW500ImageUrl } from '../api/urls'
import { addToList } from '../components/shows'
import firebase from 'react-native-firebase'
export default class ShowDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.getParam('id'),
            show: null,
            loading: true
        }
    }

    componentDidMount() {
        this.fetchShowDetails(this.state.id)
    }

    fetchShowDetails(id) {
        fetchShowInfo({ id: id }).then(data => {
            this.setState({
                show: data,
                loading: false
            });
            url = getW500ImageUrl(data.backdrop_path)


        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        const { show, loading } = this.state;
        if (show && !loading) {
            return (
                <View style={styles.container}>
                    <Text>{show.name}</Text>
                    <Image source={{ uri: getW500ImageUrl(show.backdrop_path) }} style={styles.backdrop} />
                    <Button
                        title="Add to list"
                        onPress={addToList}
                    />
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
