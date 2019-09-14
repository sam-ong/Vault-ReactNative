import React from 'react'
import { getW500ImageUrl } from '../api/urls'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase'

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
                style={styles.imageThumbnail} />
        </View>
    </TouchableOpacity>
}

export const addToList = () => {
    const { currentUser } = firebase.auth()
    docRef = firebase.firestore().collection('users').doc(currentUser.uid);

    // this.unsubscribe = this.ref.doc(currentUser.uid).onSnapshot(doc => {
    //   this.setState({
    //     watchList: doc.data().watchList,
    //     alreadyWatched: doc.data().alreadyWatched,
    //     loading: false
    //   })
    // })

    if (!this.watchList || this.watchList[id]) { return; }

    docRef.set({
      "watchList": {
        [id]: poster_path
      }
    }, { merge: true })

    
}

const styles = StyleSheet.create({
    listItemContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 1
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
});
