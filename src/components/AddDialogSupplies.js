import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddDialogSupplies({ open, onClose }) {
  const handleClose = () => {
    onClose(false);
  };

  const handleAddSupply = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    formJson.liters = parseFloat(formJson.liters);
    console.log(JSON.stringify(formJson))

    try {
        
      const response = await fetch('http://localhost:8000/supplies/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });

      if (response.ok) {
        console.log('Suministro agregado con éxito');

      } else {
        console.error('Error al agregar el suministro');
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
          onSubmit: handleAddSupply,
        }}
      >
        <DialogTitle>Agregar Suministro</DialogTitle>
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
            id="Supplies_date"
            name="Supplies_date"
            label="Fecha de Suministro"
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
            label="Placa del Camión Cisterna"
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
