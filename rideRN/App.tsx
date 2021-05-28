import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import merge from "deepmerge";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View, UIManager, Platform, LogBox } from "react-native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { AppContextProvider } from "./src/context/AppContext";
import useAppContext from "./src/hooks/useAppContext";
import AuthStack from "./src/navigation/auth";
import UserStack from "./src/navigation/user";
import Home from "./src/screens/home";
import * as SplashScreen from "expo-splash-screen";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { EventRegister } from "react-native-event-listeners";
import SnackbarComponent from "./src/component/snakbar";
const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
const Stack = createStackNavigator();
axios.defaults.baseURL = "http://dry-bayou-84082.herokuapp.com";

LogBox.ignoreAllLogs();
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
interface Root {
  state: boolean;
}
const RootApp = ({ state }: Root) => {
  const { theme, setToken, setUserObject, token } = useAppContext();

  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        let res = await AsyncStorage.getItem("userObject");
        if (res) {
          let data = JSON.parse(res);
          console.log(data);
          setToken(data.token);
          setUserObject(data.user);
        }
        // Pre-load fonts, make any API calls you need to do here
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render

        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);
  React.useEffect(() => {
    let listener = EventRegister.addEventListener("authStatus", (data) => {
      setIsLoggedIn(data);
    });
    return () => listener;
  }, []);
  if (!appIsReady) {
    return null;
  }

  return (
    <PaperProvider theme={state ? CombinedDarkTheme : CombinedDefaultTheme}>
      <NavigationContainer theme={state ? CombinedDarkTheme : CombinedDefaultTheme}>
        {token ? <UserStack /> : <AuthStack />}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default function App() {
  const { isDarkTheme } = useAppContext();
  return (
    <AppContextProvider>
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        translucent
        backgroundColor="rgba(255, 255, 255,0)"
        hidden={false}
        showHideTransition="fade"
      />
      <View style={{ height: StatusBar.currentHeight, width: "100%" }} />
      <RootApp state={isDarkTheme} />
      <SnackbarComponent />
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: "black",
    position: "absolute",
    // top: 0,
    // right: 0,
  },
});
