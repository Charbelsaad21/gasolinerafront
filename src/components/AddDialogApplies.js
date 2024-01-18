import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddDialogApplies({ open, onClose }) {
  const handleClose = () => {
    onClose(false);
  };

  const handleAddApplies = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    try {
     
      const response = await fetch('http://localhost:8000/applies/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });

      if (response.ok) {
        console.log('Aplicación agregada con éxito');
      } else {
        console.error('Error al agregar la aplicación');
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
          onSubmit: handleAddApplies,
        }}
      >
        <DialogTitle>Agregar Aplicación</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="modality_id"
            name="modality_id"
            label="ID de Modalidad"
            fullWidth
            variant="standard"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
          />
          <TextField
            required
            margin="dense"
            id="city_id"
            name="city_id"
            label="ID de Ciudad"
            fullWidth
            variant="standard"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
          />
          <TextField
            required
            margin="dense"
            id="aplies_start_date"
            name="aplies_start_date"
            label="Fecha de Inicio"
            fullWidth
            variant="standard"
            type="date"
          />
          <TextField
            required
            margin="dense"
            id="aplies_End_date"
            name="aplies_End_date"
            label="Fecha de Fin"
            fullWidth
            variant="standard"
            type="date"
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
