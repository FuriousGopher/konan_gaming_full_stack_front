import { Dialog } from '@mui/material';
import RegistrationForm from './forms/RegistrationForm.tsx';

const ModalForRegister = (props: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <RegistrationForm handleClose={props.handleClose} />
    </Dialog>
  );
};

export default ModalForRegister;
