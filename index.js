/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from './src/configs/firebase';

console.log('config firebase',firebase);

AppRegistry.registerComponent(appName, () => App);
