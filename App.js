import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainView from './screens/MainView';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={MainView}
          name="MainView"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
