import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddDialogDrives({ open, onClose }) {
  const handleClose = () => {
    onClose(false);
  };

  const handleAddDrives = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:8000/drives/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });

      if (response.ok) {
        console.log('Conducción agregada con éxito');
      } else {
        console.error('Error al agregar la conducción');
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
          onSubmit: handleAddDrives,
        }}
      >
        <DialogTitle>Agregar Conducción</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="driver_id"
            name="driver_id"
            label="ID del Conductor"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="plateTT"
            name="plateTT"
            label="Placa del Camión Tanque"
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
