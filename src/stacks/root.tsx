import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/home';
import JotaiOnyxScreen from '../pages/jotai-onyx/JotaiOnyxScreen';

export type RootStackParamList = {
  Home: undefined;
  JotaiOnyx: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'Experiments'}}
      />
      <Stack.Screen
        name="JotaiOnyx"
        component={JotaiOnyxScreen}
        options={{title: 'JotaiOnyx'}}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
