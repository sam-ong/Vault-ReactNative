import React from 'react'
import { getW500ImageUrl } from '../api/urls'
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList } from 'react-native'
import firebase from 'react-native-firebase'
import style from '../screens/style'

//Show image thumbnail for grid view
export const renderShowItem = (props, data) => {
    //function to go to next screen
    goToNextScreen = (id) => {
        return props.navigation.push('ShowDetails', {
            id: id,
        });
    }

    return <TouchableOpacity style={{ backgroundColor: 'transparent' }} onPress={() => this.goToNextScreen(data.item.id)}>
        <View style={styles.listItemContainer}>
            {/* <Text>{data.item.name}</Text> */}
            <Image source={{ uri: getW500ImageUrl(data.item.poster_path) }}
                style={style.imageThumbnail} />
        </View>
    </TouchableOpacity>
}

//Display episode list
export const renderSeasonItem = (props, data) => {
    return <View style={styles.listItemContainer}>
        <Text style={{fontWeight: 'bold'}}> {data.item.name}</Text>
        <FlatList
            data={data.item.episodes}
            renderItem={(data) => renderEpisodeItem(props, data)}
            keyExtractor={(item) => `${item.id}`}
        />
    </View>
}

export const renderEpisodeItem = (props, data) => {
    goToNextScreen = (id) => {
        return props.navigation.push('EpisodeDetails', {
            id: id,
        });
    }
    return <TouchableOpacity style={{ backgroundColor: 'transparent' }} onPress={() => this.goToNextScreen(data.item.id)}>
        <View style={styles.listItemContainer}>
            <Text>{data.item.name}</Text>
        </View>
    </TouchableOpacity>
}

//Add to watch list or already watched list: "watchList" | "alreadyWatched"
export const addToList = (list, show) => {
    const { currentUser } = firebase.auth()
    docRef = firebase.firestore().collection('users').doc(currentUser.uid);

    id = show.id
    poster_path = show.poster_path

    docRef.set({
        [list]: {
            [id]: poster_path
        }
    }, { merge: true })
}

//Add to watch list or already watched list: "watchList" | "alreadyWatched"
export const removeFromList = (list, show) => {
    const { currentUser } = firebase.auth()
    docRef = firebase.firestore().collection('users').doc(currentUser.uid);
    docRef.update({
        [list + "." + show.id]: firebase.firestore.FieldValue.delete()
    })
}

const styles = StyleSheet.create({
    listItemContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 1
    }
});
