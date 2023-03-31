import { AlertColor } from '@mui/material';
import React, { createContext } from 'react';

type loaderContextType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  notificationMessage: string;
  setNotificationMessage: React.Dispatch<React.SetStateAction<string>>;
  notificationSeverity: AlertColor;
  setNotificationSeverity: React.Dispatch<React.SetStateAction<AlertColor>>;
};

const loaderContextState = createContext({
  isLoading: false,
  setIsLoading: () => {},
  notificationMessage: '',
  setNotificationMessage: () => {},
  notificationSeverity: 'error',
  setNotificationSeverity: () => {},
});

const loaderContext = createContext<loaderContextType>(loaderContextState);

export default loaderContext;
