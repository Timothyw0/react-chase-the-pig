import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { INVALID_PASSWORD } from 'src/utils/messaging';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import Styles from './Login.module.css';

interface FormProps {
  values: {
    email: string;
    password: string;
  };
  errors: {
    email: Array<string>;
    password: Array<string>;
  };
  touched: {
    email: Boolean;
    password: Boolean;
  };
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
}

const Login: React.FC = () => {
  const initialState = {
    email: '',
    password: '',
  };

  const [invalidLogin, setInvalidLogin] = useState<Boolean>(false);
  const navigate = useNavigate();
  const { values, changeHandler }: FormProps = useForm(initialState);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, values?.email, values?.password)
      .then((userCredential) => {
        sessionStorage.setItem('ctp-user', JSON.stringify(userCredential));
        navigate('/home');
      })
      .catch(() => {
        setInvalidLogin(true);
      });
  };

  return (
    <form name="loginForm" onSubmit={submitForm}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("https://source.unsplash.com/random")',
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
              Sign in
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
              <TextField
                onChange={changeHandler}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              {invalidLogin && <span className={Styles.errorText}>{INVALID_PASSWORD}</span>}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="#">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/register">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default memo(Login);
