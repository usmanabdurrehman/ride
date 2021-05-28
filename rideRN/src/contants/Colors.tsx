const tintColorLight = "purple";
const tintColorDark = "#fff";
export interface IColor {
  text: string;
  tintText: string;
  background: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
}
const Colors = {
  light: {
    text: "#fff",
    tintText: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#000",
    tintText: "#fff",
    background: "#021",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};

export default Colors;
