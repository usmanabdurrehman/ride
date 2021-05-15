//import liraries
import React, { Component } from "react";
import { View, StyleProp, StyleSheet, TouchableNativeFeedback, ViewStyle } from "react-native";

import { heightRef, widthRef } from "./../contants/screenSize";
// create a component
interface Props {
  children: JSX.Element[] | JSX.Element;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  padding?: boolean;
}
const IconButton = ({ children, onPress, style, padding }: Props) => {
  return (
    <TouchableNativeFeedback useForeground={true} onPress={onPress}>
      <View
        style={[
          {
            minHeight: 50 * heightRef,
            minWidth: 50 * heightRef,
            borderRadius: 200,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            padding: padding ? 10 * heightRef : 0,
          },
          style,
        ]}
      >
        {children}
      </View>
    </TouchableNativeFeedback>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default IconButton;
