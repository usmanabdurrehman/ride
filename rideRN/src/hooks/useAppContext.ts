import React from 'react';
import AppContext from '../context/AppContext';
import { AppContextTypes } from '../context/AppContext/types';

export default function useAppContext(): AppContextTypes {
  return React.useContext(AppContext);
}
