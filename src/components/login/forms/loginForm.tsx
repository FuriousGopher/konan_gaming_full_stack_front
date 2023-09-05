import { useState } from 'react';
import { login } from '../../../apis/api.ts';
import { Alert, Button, TextField } from '@mui/material';

const LoginForm = (props: { handleClose: () => void }) => {
  const [loginOrEmail, setLoginOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string[]>([]);

  const handleLogin = async () => {
    try {
      const loginData = {
        loginOrEmail,
        password,
      };

      await login(loginData);

      props.handleClose();
    } catch (e: any) {
      setError([e.response.data.message]);
      console.error(e.response.data);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      {!!error.length &&
        error.map((errorMessage, index) => {
          return (
            <Alert key={index} severity="error">
              {errorMessage}
            </Alert>
          );
        })}
      <TextField
        label="Your Login or email"
        variant="filled"
        required
        value={loginOrEmail}
        onChange={(e) => setLoginOrEmail(e.target.value)}
        sx={{ margin: '1rem', width: '300px' }}
      />
      <TextField
        label="Password"
        type="password"
        variant="filled"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ margin: '1rem', width: '300px' }}
      />
      <div>
        <Button
          variant="outlined"
          color="error"
          sx={{ margin: '2rem' }}
          onClick={props.handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="info"
          sx={{ margin: '2rem' }}
          type="submit"
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
