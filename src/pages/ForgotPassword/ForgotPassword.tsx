import React, { memo, useContext } from 'react';
import loaderContext from 'src/contexts/loaderContext';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';

interface FormProps {
  values: {
    email: string;
  };
  errors: {
    email: Array<string>;
  };
  touched: {
    email: Boolean;
  };
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
}

const ForgotPassword: React.FC = () => {
  const initialState = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();
  const { values, changeHandler }: FormProps = useForm(initialState);
  const { setIsLoading, setNotificationMessage, setNotificationSeverity } = useContext(loaderContext);
  const auth = getAuth();

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await sendPasswordResetEmail(auth, values?.email)
      .then(() => {
        navigate('/login');
      })
      .catch((err) => {
        setNotificationSeverity('error');
        setNotificationMessage(err?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form name="forgotPasswordForm" onSubmit={submitForm}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url("https://c1.wallpaperflare.com/preview/548/541/260/playing-cards-poker-bridge-game.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                onChange={changeHandler}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Send Reset Email
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default memo(ForgotPassword);
