import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddDialogModels({ open, onClose }) {
  const handleClose = () => {
    onClose(false);
  };

  const handleAddModel = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    try {
      
      const response = await fetch('http://localhost:8000/models/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });

      if (response.ok) {
        console.log('Modelo agregado con éxito');
        
      } else {
        console.error('Error al agregar el modelo');
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
          onSubmit: handleAddModel,
        }}
      >
        <DialogTitle>Agregar Modelo</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="mod_name"
            name="mod_name"
            label="Nombre del Modelo"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="brand"
            name="brand"
            label="Marca"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="type_vehicle"
            name="type_vehicle"
            label="Tipo de Vehículo"
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
