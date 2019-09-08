import React from 'react'
import { getW500ImageUrl } from '../api/urls'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

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
