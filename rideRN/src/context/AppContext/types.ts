import React from 'react';
import { IColor } from '../../contants/Colors';

export interface AppContextStates {
  isDarkTheme: boolean;
  theme: IColor
  
}

export interface AppContextMethods {
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

export type AppContextTypes = AppContextStates & AppContextMethods;
