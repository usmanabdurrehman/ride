import { Dimensions } from "react-native";
const fullHeight: number = Dimensions.get("window").height;
const heightRef: number = fullHeight / 812;
const fullWidth: number = Dimensions.get("window").width;
const widthRef: number = fullWidth / 375;

export { heightRef, widthRef, fullWidth, fullHeight };
