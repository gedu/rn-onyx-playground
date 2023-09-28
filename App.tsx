import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/stacks/root';

function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
