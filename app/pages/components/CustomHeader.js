import React from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Link } from 'expo-router'

const CustomHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <Link href="/pages/admin/details">
                <Icon name="person-circle-outline" size={30} color="#000" style={styles.icon} />

            </Link>
            <Link href="/pages/components/Notifications">
                <Icon name="notifications-outline" size={30} color="#000" style={styles.icon} /></Link>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        width: '100%',
    },
    icon: {
        marginHorizontal: 10,
    },
})

export default CustomHeader