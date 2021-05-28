import React from 'react';
import { IColor } from '../../contants/Colors';

export interface AppContextStates {
  isDarkTheme: boolean;
  theme: IColor;
  token: string;
  userObject:{"email": string,
    "image":string,
    "isMember": boolean,
    "name":string},
}

export interface AppContextMethods {
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setUserObject: React.Dispatch<React.SetStateAction<object>>;
}


export type AppContextTypes = AppContextStates & AppContextMethods;
