import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddDialogTankerTrucks({ open, onClose }) {
  const handleClose = () => {
    onClose(false);
  };

  const handleAddTankerTruck = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    try {
      // Enviar la solicitud a la ruta /tanker-trucks/insert con los datos del formulario utilizando fetch
      const response = await fetch('http://localhost:8000/tanker-trucks/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });

      if (response.ok) {
        console.log('Camión cisterna agregado con éxito');
        // Puedes realizar otras acciones después de agregar el camión cisterna
      } else {
        console.error('Error al agregar el camión cisterna');
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
          onSubmit: handleAddTankerTruck,
        }}
      >
        <DialogTitle>Agregar Camión Cisterna</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="plateTT"
            name="plateTT"
            label="Placa del Camión Cisterna"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="capacity_lit"
            name="capacity_lit"
            label="Capacidad en Litros"
            type="number"
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
