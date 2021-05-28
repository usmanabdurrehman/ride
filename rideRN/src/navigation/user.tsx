import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import Home from "../screens/home";
import EditProfile from "../screens/home/editProfile";
import Profile from "../screens/home/profile";
import Ride from "../screens/home/ride";
const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Ride" component={Ride} />
    </Stack.Navigator>
  );
};

export default UserStack;

const styles = StyleSheet.create({});
