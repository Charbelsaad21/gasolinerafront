import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddDialogDispatched({ open, onClose }) {
  const handleClose = () => {
    onClose(false);
  };

  const handleAddDispatched = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    try {
      
      const response = await fetch('http://localhost:8000/dispatched/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });

      if (response.ok) {
        console.log('Envío agregado con éxito');
      } else {
        console.error('Error al agregar el envío');
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
          onSubmit: handleAddDispatched,
        }}
      >
        <DialogTitle>Agregar Envío</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="station_rif"
            name="station_rif"
            label="RIF de la Estación"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="plate"
            name="plate"
            label="Placa del Vehículo"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="dispatch_date"
            name="dispatch_date"
            label="Fecha de Envío"
            fullWidth
            variant="standard"
            type="date"
          />
          <TextField
            required
            margin="dense"
            id="liters"
            name="liters"
            label="Litros"
            fullWidth
            variant="standard"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
          />
          <TextField
            required
            margin="dense"
            id="bs"
            name="bs"
            label="Bs"
            fullWidth
            variant="standard"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
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
