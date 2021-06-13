import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Scheduling from '../screens/Scheduling';
import Home from '../screens/Home';



const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
        headerShown:false
    }}
    >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Scheduling" component={Scheduling} />
        <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
    
);