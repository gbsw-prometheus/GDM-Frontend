import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigations/root/RootNavigator';
import BootSplash from 'react-native-bootsplash';

function App() {
  return (
    <NavigationContainer
      onReady={() => {
        BootSplash.hide({fade: true});
      }}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
