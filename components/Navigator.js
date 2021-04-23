import React, { Component } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Dictionary from '../screens/Dictionary'
import Wikipedia from '../screens/Wikipedia'
import { View,StatusBar } from 'react-native';

const Tab = createMaterialTopTabNavigator()

export function TabNavigator ()  {
    return (
        <Tab.Navigator
            initialRouteName="Dictionary"
            tabBarOptions={{
                activeTintColor: '#e91e63',
                labelStyle: { fontSize: 15 },
                style: { backgroundColor: 'powderblue' },
            }}
            style={{marginTop:StatusBar.currentHeight }}
        >
            <Tab.Screen
                name="Dictionary"
                component={Dictionary}
                options={{ tabBarLabel: 'Dictionary', }}
            />
            <Tab.Screen
                name="Wiki"
                component={Wikipedia}
                options={{ tabBarLabel: 'Wikipedia' }}
            />
        </Tab.Navigator>
    )
}
