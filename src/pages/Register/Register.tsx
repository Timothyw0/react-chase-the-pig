import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { INVALID_EMAIL, MAXIMUM_EXCEEDED, PASSWORD_MISMATCH } from 'src/utils/messaging';
import Styles from './Register.module.css';

interface FormProps {
  values: {
    username: String;
    email: String;
    passwordOne: String;
    passwordTwo: String;
  };
  errors: {
    username: Array<String>;
    email: Array<String>;
    passwordOne: Array<String>;
    passwordTwo: Array<String>;
  };
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
}

const Register: React.FC = () => {
  const initialState = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
  };
  const constraints = {
    username: {
      length: {
        maximum: 12,
        message: MAXIMUM_EXCEEDED,
      },
    },
    email: {
      email: {
        message: INVALID_EMAIL,
      },
    },
    passwordTwo: {
      equality: { attribute: 'passwordOne', message: PASSWORD_MISMATCH },
    },
  };

  const { values, errors, changeHandler }: FormProps = useForm(initialState, constraints);

  console.log(values, errors);

  return (
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
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={changeHandler}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            {errors?.username && <span className={Styles.errorText}>{errors?.username?.[0]}</span>}
            <TextField
              onChange={changeHandler}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
            />
            {errors?.email && <span className={Styles.errorText}>{errors?.email?.[0]}</span>}
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
  );
};

export default memo(Register);
