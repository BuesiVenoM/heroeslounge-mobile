import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StreamOverviewScreen from '../screens/StreamOverviewScreen';
import InfoScreen from '../screens/InfoScreen';
import SelectionStreamScreen from '../screens/SelectionStreamsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const StreamOverviewStack = createStackNavigator({
  Settings: StreamOverviewScreen,
});

StreamOverviewStack.navigationOptions = {
  tabBarLabel: 'Today',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-film' : 'md-film'}
    />
  ),
};

const InfoStack = createStackNavigator({
  Settings: InfoScreen,
});

InfoStack.navigationOptions = {
  tabBarLabel: 'Infos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-information-circle' : 'md-information-circle'}
    />
  ),
};

const StreamSelectionStack = createStackNavigator({
  Settings: SelectionStreamScreen,
});

StreamSelectionStack.navigationOptions = {
  tabBarLabel: 'Selecion',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-film' : 'md-film'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  StreamOverviewStack,
  StreamSelectionStack,
  LinksStack,
  SettingsStack,
  InfoStack
});
