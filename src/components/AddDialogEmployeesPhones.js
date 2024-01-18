import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddDialogEmployeesPhones({ open, onClose }) {
  const handleClose = () => {
    onClose(false);
  };

  const handleAddEmployeesPhones = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    try {
      
      const response = await fetch('http://localhost:8000/EmployeesPhones/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });

      if (response.ok) {
        console.log('Teléfono de empleado agregado con éxito');

      } else {
        console.error('Error al agregar el teléfono de empleado');
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
          onSubmit: handleAddEmployeesPhones,
        }}
      >
        <DialogTitle>Agregar Teléfono de Empleado</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="emp_id"
            name="emp_id"
            label="ID del Empleado"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="phone_number_emp"
            name="phone_number_emp"
            label="Número de Teléfono del Empleado"
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
