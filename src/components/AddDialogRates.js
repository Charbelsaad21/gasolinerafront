import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddDialogRates({ open, onClose }) {
  const handleClose = () => {
    onClose(false);
  };

  const handleAddRate = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    try {
      
      const response = await fetch('http://localhost:8000/rates/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });

      if (response.ok) {
        console.log('Tasa agregada con éxito');
        
      } else {
        console.error('Error al agregar la tasa');
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
          onSubmit: handleAddRate,
        }}
      >
        <DialogTitle>Agregar Tasa</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="rate_date"
            name="rate_date"
            label="Fecha de la Tasa"
            fullWidth
            variant="standard"
            type="date"
          />
          <TextField
            required
            margin="dense"
            id="rates_value"
            name="rates_value"
            label="Valor de la Tasa"
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
