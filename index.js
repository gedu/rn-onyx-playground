/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {initOnyx} from './src/lib/onyx';

AppRegistry.registerComponent(appName, () => App);
initOnyx();
