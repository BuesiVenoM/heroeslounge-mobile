import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import SelectionStreams from "../screens/SelectionStreamsScreen";

import StreamDetails from "../screens/StreamDetailScreen";
import HomeScreen from '../screens/HomeScreen';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Home: HomeScreen,
  SelectionStreams: SelectionStreams,
  StreamDetails: StreamDetails,
}));