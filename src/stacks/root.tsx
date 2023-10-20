import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/home';
import JotaiOnyxCollectionScreen from '../pages/jotai-onyx/CollectionScreen';

export type RootStackParamList = {
  Home: undefined;
  JotaiOnyxCollection: undefined;
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
        name="JotaiOnyxCollection"
        component={JotaiOnyxCollectionScreen}
        options={{title: 'Jotai + Onyx (Collection)'}}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
