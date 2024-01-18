import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddDialogOwners({ open, onClose }) {
  const [formData, setFormData] = useState({
    owner_id: '',
    email: '',
    owner_name: '',
  });

  const handleClose = () => {
    onClose(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddOwner = async (event) => {
    event.preventDefault();

    try {
      
      const response = await fetch('http://localhost:8000/owners/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Propietario agregado con éxito');
        
      } else {
        console.error('Error al agregar el propietario');
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
          onSubmit: handleAddOwner,
        }}
      >
        <DialogTitle>Agregar Propietario</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="owner_id"
            name="owner_id"
            label="ID del Propietario"
            fullWidth
            variant="standard"
            value={formData.owner_id}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            label="Email"
            fullWidth
            variant="standard"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="owner_name"
            name="owner_name"
            label="Nombre del Propietario"
            fullWidth
            variant="standard"
            value={formData.owner_name}
            onChange={handleInputChange}
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
