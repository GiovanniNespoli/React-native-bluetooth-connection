import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Welcome } from '@modules/Welcome';
import { BluetoothConnection } from '@modules/BluetoothConnection';

const { Navigator, Screen } = createStackNavigator();

export default function StackRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name="welcome"
                component={Welcome}
            />
            <Screen
                name="BluetoothConnection"
                component={BluetoothConnection}
            />
        </Navigator>
    )
}