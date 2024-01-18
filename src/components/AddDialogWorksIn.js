import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddDialogWorksIn({ open, onClose }) {
  const handleClose = () => {
    onClose(false);
  };

  const handleAddWorksIn = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    try {
    
      const response = await fetch('http://localhost:8000/worksin/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });

      if (response.ok) {
        console.log('Registro de trabajo agregado con éxito');
       
      } else {
        console.error('Error al agregar el registro de trabajo');
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
          onSubmit: handleAddWorksIn,
        }}
      >
        <DialogTitle>Agregar Registro de Trabajo</DialogTitle>
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
            id="emp_id"
            name="emp_id"
            label="ID del Empleado"
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
