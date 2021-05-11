import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainView from './screens/MainView';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={MainView} name="MainView" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
