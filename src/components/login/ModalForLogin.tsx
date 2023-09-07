import { Dialog } from '@mui/material';
import LoginForm from './forms/loginForm.tsx';

const ModalForLogin = (props: { open: boolean; handleClose: () => void }) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <LoginForm handleClose={props.handleClose} />
    </Dialog>
  );
};

export default ModalForLogin;
