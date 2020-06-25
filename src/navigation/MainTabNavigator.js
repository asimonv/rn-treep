import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CourseScreen from "../screens/CourseScreen";
import TeacherScreen from "../screens/TeacherScreen";
import CommentsScreen from "../screens/CommentsScreen";
import StatScreen from "../screens/StatScreen";

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  StatScreen: { screen: StatScreen },
  Course: CourseScreen,
  Teacher: TeacherScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  ),
};

const SearchStack = createStackNavigator({
  Search: SearchScreen,
  Comments: CommentsScreen,
  Course: CourseScreen,
  Teacher: TeacherScreen,
});

SearchStack.navigationOptions = {
  tabBarLabel: "Search",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-search" : "md-search"}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  SearchStack,
  SettingsStack,
});
