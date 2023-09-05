import { Dialog } from '@mui/material';
import Form from '../Forms/Form.tsx';

const ModalDialog = (props: { open: boolean; handleClose: () => void }) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <Form handleClose={props.handleClose} />
    </Dialog>
  );
};

export default ModalDialog;
