import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddDialogOwnersPhones({ open, onClose }) {
  const handleClose = () => {
    onClose(false);
  };

  const handleAddOwnersPhones = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    try {
      
      const response = await fetch('http://localhost:8000/OwnersPhones/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });

      if (response.ok) {
        console.log('Teléfono de propietario agregado con éxito');
       
      } else {
        console.error('Error al agregar el teléfono de propietario');
      }
    } catch (error) {
      console.error('Error de red', error);
    } finally {
      handleClose();
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleAddOwnersPhones,
        }}
      >
        <DialogTitle>Agregar Teléfono de Propietario</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="owner_id"
            name="owner_id"
            label="ID del Propietario"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="phone_number_own"
            name="phone_number_own"
            label="Número de Teléfono del Propietario"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#BF2626' }}>
            Cancelar
          </Button>
          <Button type="submit" sx={{ color: '#BF2626' }}>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
