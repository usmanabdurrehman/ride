import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import merge from "deepmerge";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/home";
import useAppContext from "./src/hooks/useAppContext";
import { AppContextProvider } from "./src/context/AppContext";
import MaskedView from "@react-native-community/masked-view";
import Animated, { withSpring, useAnimatedStyle, useSharedValue, withTiming, Easing } from "react-native-reanimated";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
const Stack = createStackNavigator();
const RootApp = () => {
  const offset = useSharedValue(0);
  const [show, setShow] = React.useState(false);

  const { isDarkTheme } = useAppContext();
  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;
  // console.log(isDarkTheme);
  React.useEffect(() => {
    if (isDarkTheme) {
      offset.value = 20;
      setShow(false);
    } else {
      offset.value = 0;
      setShow(true);
    }
  }, [isDarkTheme]);
  // console.log(offset.value);
  const App = React.useCallback(
    ({ state }) => (
      <PaperProvider theme={state ? CombinedDarkTheme : CombinedDefaultTheme}>
        <NavigationContainer theme={state ? CombinedDarkTheme : CombinedDefaultTheme}>
          <Stack.Navigator initialRouteName="Home" headerMode="none">
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    ),
    []
  );
  return (
    <>
      <App state={false} />
      <MaskedView
        style={{ height: "100%", top: 0, left: 0, position: "absolute", width: "100%", flex: 1 }}
        maskElement={
          <View
            style={{
              // Transparent background because mask is based off alpha channel.
              backgroundColor: "transparent",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Animated.View
              style={[
                styles.circle,
                useAnimatedStyle(() => {
                  return {
                    transform: [
                      {
                        scale: withTiming(offset.value, {
                          duration: 1000,
                          easing: Easing.inOut(Easing.exp),
                        }),
                      },
                    ],
                  };
                }),
              ]}
            />
            {/* <View style={{ height: 100, width: 100, backgroundColor: "black" }} /> */}
          </View>
        }
      >
        <App state={true} />
      </MaskedView>
    </>
  );
};
export default function App() {
  return (
    <AppContextProvider>
      <RootApp />
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
    top: -50,
    right: -50,
  },
});
