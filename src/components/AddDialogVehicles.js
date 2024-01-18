import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddDialogVehicles({ open, onClose }) {
  const handleClose = () => {
    onClose(false);
  };

  const handleAddVehicle = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    try {
     
      const response = await fetch('http://localhost:8000/vehicles/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });

      if (response.ok) {
        console.log('Vehículo agregado con éxito');
  
      } else {
        console.error('Error al agregar el vehículo');
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
          onSubmit: handleAddVehicle,
        }}
      >
        <DialogTitle>Agregar Vehículo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="plate"
            name="plate"
            label="Placa"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="model"
            name="model"
            label="Modelo"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="capacity"
            name="capacity"
            label="Capacidad"
            fullWidth
            variant="standard"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
          />
          <TextField
            required
            margin="dense"
            id="year_release"
            name="year_release"
            label="Año de lanzamiento"
            fullWidth
            variant="standard"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
          />
          <TextField
            required
            margin="dense"
            id="serial_bodywork"
            name="serial_bodywork"
            label="Número de serie del carrocería"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="serial_chassis"
            name="serial_chassis"
            label="Número de serie del chasis"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="owner_id"
            name="owner_id"
            label="ID del Propietario"
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
