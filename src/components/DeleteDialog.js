import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteDialog({ open, onClose, onDelete }) {

  const handleClose = () => {
    onClose(false);
  };

  return (
    <React.Fragment>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Estás seguro que quieres eliminar?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Lo que elimines no podrás recuperar.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => onClose(false)} sx={{ color: "#BF2626" }} >No</Button>
        <Button onClick={() => { onClose(true); onDelete(); }} sx={{ color: "#BF2626" }} autoFocus>
          Sí
        </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
