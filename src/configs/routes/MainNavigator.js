import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import { Icon } from "native-base";
import { Image } from "react-native";

import Home from '../../screens/Home';
import Account from '../../screens/Account';
import Chats from '../../screens/Chats';
import Login from '../../screens/Login';
import Register from '../../screens/Register';

const AppTabNavigator = createMaterialTopTabNavigator(
  {
    Account: {
      screen: Account,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="person" color={tintColor} size={24} />
        ),
      },
    },
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="compass" color={tintColor} size={24} />
        ),
      },
    },
    Chats: {
      screen: Chats,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="chatboxes" color={tintColor} size={24} />
        ),
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      upperCaseLabel: false,
      labelStyle: {
        fontSize: 9,
        marginTop: 1,
      },
      style: {
        backgroundColor: '#F14336',
        elevation: 15,
        height: 50,
      },
      indicatorStyle: {
        height: 0,
      },
      showIcon: true,
    },
  },
);

const AppStackNavigator = createStackNavigator(
  {
    Home: AppTabNavigator,
    Account,
    Chats,
    Login,
    Register,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AppStackNavigator);
