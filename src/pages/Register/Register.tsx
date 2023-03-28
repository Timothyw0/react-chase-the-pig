import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { INVALID_EMAIL, PASSWORD_MISMATCH } from 'src/utils/messaging';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import Styles from './Register.module.css';

interface FormProps {
  values: {
    email: string;
    passwordOne: string;
    passwordTwo: string;
  };
  errors: {
    email: Array<string>;
    passwordOne: Array<string>;
    passwordTwo: Array<string>;
  };
  touched: {
    email: Boolean;
    passwordOne: Boolean;
    passwordTwo: Boolean;
  };
  isValid: Boolean;
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
}

const Register: React.FC = () => {
  const initialState = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
  };
  const constraints = {
    email: {
      email: {
        message: INVALID_EMAIL,
      },
    },
    passwordTwo: {
      equality: { attribute: 'passwordOne', message: PASSWORD_MISMATCH },
    },
  };

  const [registerError, setRegisterError] = useState<string>('');
  const navigate = useNavigate();
  const { values, errors, touched, isValid, changeHandler }: FormProps = useForm(initialState, constraints);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values?.email, values?.passwordOne)
      .then((userCredential) => {
        localStorage.setItem('ctp-user', JSON.stringify(userCredential));
        navigate('/home');
      })
      .catch((err) => {
        setRegisterError(err?.message);
      });
  };

  return (
    <form name="registerForm" onSubmit={submitForm}>
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
              Sign Up
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
              />
              {touched?.email && errors?.email && <span className={Styles.errorText}>{errors?.email?.[0]}</span>}
              <TextField
                onChange={changeHandler}
                margin="normal"
                required
                fullWidth
                name="passwordOne"
                label="Password"
                type="password"
                id="passwordOne"
              />
              <TextField
                onChange={changeHandler}
                margin="normal"
                required
                fullWidth
                name="passwordTwo"
                label="Confirm Password"
                type="password"
                id="passwordTwo"
              />
              {errors?.passwordTwo && <span className={Styles.errorText}>{errors?.passwordTwo?.[0]}</span>}
              <br />
              {registerError && <span className={Styles.errorText}>{registerError}</span>}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login">{'Already registered? Sign In'}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default memo(Register);
