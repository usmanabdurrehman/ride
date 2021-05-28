import React from "react";
import Colors from "../../contants/Colors";
import { AppContextTypes } from "./types";

const AppContext = React.createContext<AppContextTypes>({
  isDarkTheme: false,
  setIsDarkTheme: () => {
    throw new Error("Not implemented");
  },
  theme: Colors.light,
  token: "",
  setToken: () => {
    throw new Error("Not implemented");
  },
  userObject: { email: "", image: "", isMember: false, name: "" },
  setUserObject: () => {
    throw new Error("Not implemented");
  },
});

export const AppContextProvider: React.FC = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const theme = Colors[isDarkTheme ? "dark" : "light"];
  const [token, setToken] = React.useState("");
  const [userObject, setUserObject] = React.useState({});
  return (
    <AppContext.Provider value={{ isDarkTheme, setIsDarkTheme, theme, token, setToken, userObject, setUserObject }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
