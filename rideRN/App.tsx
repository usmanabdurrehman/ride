import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import merge from "deepmerge";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View, UIManager, Platform } from "react-native";
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

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
const Stack = createStackNavigator();
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
interface Root {
  state: boolean;
}
const RootApp = ({ state }: Root) => {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
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

  if (!appIsReady) {
    return null;
  }

  return (
    <PaperProvider theme={state ? CombinedDarkTheme : CombinedDefaultTheme}>
      <NavigationContainer theme={state ? CombinedDarkTheme : CombinedDefaultTheme}>
        {isLoggedIn ? <UserStack /> : <AuthStack />}
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
