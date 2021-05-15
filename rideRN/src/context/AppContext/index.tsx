import React from "react";
import Colors from "../../contants/Colors";
import { AppContextTypes } from "./types";

const AppContext = React.createContext<AppContextTypes>({
  isDarkTheme: false,
  setIsDarkTheme: () => {
    throw new Error("Not implemented");
  },
  theme: Colors.light,
});

export const AppContextProvider: React.FC = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const theme = Colors[isDarkTheme ? "dark" : "light"];
  return <AppContext.Provider value={{ isDarkTheme, setIsDarkTheme, theme }}>{children}</AppContext.Provider>;
};

export default AppContext;
