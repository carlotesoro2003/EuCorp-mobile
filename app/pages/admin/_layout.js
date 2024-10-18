import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import CustomHeader from '../components/CustomHeader'
import { MaterialIcons, Feather } from '@expo/vector-icons';


const _layout = () => {
    return (
        <View style={styles.container}>
            <CustomHeader />
            <Tabs
                screenOptions={{
                    tabBarShowLabel: true,   
                    tabBarActiveTintColor: '#e91e63', 
                    tabBarInactiveTintColor: '#ccc',  
                    tabBarStyle: {
                        backgroundColor: '#ffffff',   
                        paddingBottom: 10,            
                        height: 60,                   
                    },
                    headerShown: false,
                    
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="home" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="plans"
                    options={{
                        title: 'Plans',
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="clipboard" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="risks"
                    options={{
                        title: 'Risks',
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="alert-triangle" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="opportunities"
                    options={{
                        title: 'Opportunities',
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="trending-up" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </View>
    )
}

export default _layout

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})