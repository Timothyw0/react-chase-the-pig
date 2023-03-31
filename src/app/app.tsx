import './app.module.css';
import { useState } from 'react';
import Routes from '../routes/Routes';
import { Alert, AlertColor, Backdrop, CircularProgress, Snackbar } from '@mui/material';
import loaderContext from 'src/contexts/loaderContext';

export function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const [notificationSeverity, setNotificationSeverity] = useState<AlertColor>('error');

  return (
    <loaderContext.Provider
      value={{
        isLoading,
        setIsLoading,
        notificationMessage,
        setNotificationMessage,
        notificationSeverity,
        setNotificationSeverity,
      }}
    >
      <div>
        <Snackbar
          open={notificationMessage.length > 0}
          onClose={() => setNotificationMessage('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity={notificationSeverity}>{notificationMessage}</Alert>
        </Snackbar>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress />
        </Backdrop>
        <Routes />
      </div>
    </loaderContext.Provider>
  );
}

export default App;
