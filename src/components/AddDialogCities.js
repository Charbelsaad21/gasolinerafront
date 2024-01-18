import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddDialogCities({ open, onClose }) {
  const handleClose = () => {
    onClose(false);
  };

  const handleAddCity = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    
    formJson.city_id = 0;

    try {
      
      const response = await fetch('http://localhost:8000/cities/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });

      if (response.ok) {
        console.log('Ciudad agregada con éxito');
      } else {
        console.error('Error al agregar la ciudad');
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
          onSubmit: handleAddCity,
        }}
      >
        <DialogTitle>Agregar Ciudad</DialogTitle>
        <DialogContent>

          <TextField
            required
            margin="dense"
            id="city_name"
            name="city_name"
            label="Nombre de la Ciudad"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="state_id"
            name="state_id"
            label="ID del Estado"
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
