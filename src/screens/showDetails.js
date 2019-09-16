import React from 'react'
import { StyleSheet, Image, Text, View, Button, ActivityIndicator } from 'react-native'
import { fetchShowInfo } from '../api/shows'
import { getW500ImageUrl } from '../api/urls'
import { addToList, removeFromList } from '../components/shows'
import firebase from 'react-native-firebase'

export default class ShowDetails extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('users');

        this.state = {
            id: this.props.navigation.getParam('id'),
            show: null,
            loading: true,
            watchList: [],
            alreadyWatched: []
        }
    }

    componentDidMount() {
        this.fetchShowDetails(this.state.id)

        const { currentUser } = firebase.auth()

        this.unsubscribe = this.ref.doc(currentUser.uid).onSnapshot(doc => {
            this.setState({
                watchList: doc.data().watchList,
                alreadyWatched: doc.data().alreadyWatched,
                loading: false
            })
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
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

    isInWatchList(id) {
        return this.state.watchList[id]
    }

    isInAlreadyWatched(id) {
        return this.state.alreadyWatched[id]
    }

    render() {
        const { show, loading } = this.state;
        if (show && !loading) {
            return (
                <View style={styles.container}>
                    <Text>{show.name}</Text>
                    <Image source={{ uri: getW500ImageUrl(show.backdrop_path) }} style={styles.backdrop} />
                    {this.isInWatchList(show.id) ?
                        <Button
                            title="Remove from watch list"
                            onPress={() => removeFromList("watchList", show)}
                        /> :
                        <Button
                            title="Add to watch list"
                            onPress={() => addToList("watchList", show)}
                        />
                    }
                    
                    {this.isInAlreadyWatched(show.id) ?
                        <Button
                            title="Remove from already watched list"
                            onPress={() => removeFromList("alreadyWatched", show)}
                        /> :
                        <Button
                            title="Add to already watched"
                            onPress={() => addToList("alreadyWatched", show)}
                        />
                    }

                    <Button
                        title="View recommended shows"
                        onPress={() => this.props.navigation.push('ViewRecommended', { show })}
                    />
                    <Button
                        title="View similar shows"
                        onPress={() => this.props.navigation.push('ViewSimilar', { show })}
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
