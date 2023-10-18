import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/home';
import JotaiOnyxPersonalDetails from '../pages/jotai-onyx/PersonalDetailsScreen';
import JotaiOnyxReports from '../pages/jotai-onyx/ReportsScreen';

export type RootStackParamList = {
  Home: undefined;
  JotaiOnyxPersonalDetails: undefined;
  JotaiOnyxReports: undefined;
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
        name="JotaiOnyxPersonalDetails"
        component={JotaiOnyxPersonalDetails}
        options={{title: 'Jotai + Onyx (Personal Details)'}}
      />
      <Stack.Screen
        name="JotaiOnyxReports"
        component={JotaiOnyxReports}
        options={{title: 'Jotai + Onyx (Reports)'}}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
