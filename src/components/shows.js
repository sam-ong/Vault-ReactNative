import React from 'react'
import { getW500ImageUrl } from '../api/urls'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase'
import style from '../screens/style'

//Show thumbnail for grid view

export const renderShowItem = (props, data) => {
    const { navigate } = props.navigation;
    //function to go to next screen
    goToNextScreen = (id) => {
        return navigate('ShowDetails', {
            id: id,
        });
    }

    return <TouchableOpacity style={{ backgroundColor: 'transparent' }} onPress={() => this.goToNextScreen(data.item.id)}>
        <View style={styles.listItemContainer}>
            <Text>{data.item.name}</Text>
            <Image source={{ uri: getW500ImageUrl(data.item.poster_path) }}
                style={style.imageThumbnail} />
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

const styles = StyleSheet.create({
    listItemContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 1
    }
});
