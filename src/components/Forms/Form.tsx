import { Alert, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { registration } from '../../apis/api.ts';

const Form = (props: { handleClose: () => void }) => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string[]>([]);

  const handleSubmit = async () => {
    try {
      const userData = {
        login,
        email,
        password,
      };

      await registration(userData);

      props.handleClose();
    } catch (e) {
      const errorsArray = e.response.data.message as {
        message: string;
        field: string;
      }[];
      const errorStringsArray = errorsArray.map((e) => {
        return e.message;
      });
      setError(errorStringsArray);
      console.error(e.response.data.message);
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
        error.map((e) => {
          return <Alert severity="error">{e}</Alert>;
        })}
      <TextField
        label="Login"
        variant="filled"
        required
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        sx={{ margin: '1rem', width: '300px' }}
      />
      <TextField
        label="Email"
        type="email"
        variant="filled"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
          color="primary"
          sx={{ margin: '2rem' }}
          onClick={props.handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ margin: '2rem' }}
          type="submit"
          onClick={handleSubmit}
        >
          Signup
        </Button>
      </div>
    </div>
  );
};

export default Form;
