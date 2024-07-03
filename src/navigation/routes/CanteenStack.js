import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const CanteenStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#bd2323',
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
    }}
  ></Stack.Navigator>
  )
}

export default CanteenStack