import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddDialogServiceStations({ open, onClose }) {
  const [formData, setFormData] = useState({
    station_rif: '',
    adress: '',
    amount_of_fuel: 0,
    payment_type: '',
    station_name: '',
    city_id: 0,
    manager_id: '',
    manager_start_date: '2024-01-17',
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

  const handleAddServiceStation = async (event) => {
    event.preventDefault();

    try {
     
      const response = await fetch('http://localhost:8000/service-stations/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Estación de servicio agregada con éxito');
        
      } else {
        console.error('Error al agregar la estación de servicio');
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
          onSubmit: handleAddServiceStation,
        }}
      >
        <DialogTitle>Agregar Estación de Servicio</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="station_rif"
            name="station_rif"
            label="RIF de la Estación"
            fullWidth
            variant="standard"
            value={formData.station_rif}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="adress"
            name="adress"
            label="Dirección"
            fullWidth
            variant="standard"
            value={formData.adress}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="amount_of_fuel"
            name="amount_of_fuel"
            label="Cantidad de Combustible"
            fullWidth
            variant="standard"
            type="number"
            value={formData.amount_of_fuel}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="payment_type"
            name="payment_type"
            label="Tipo de Pago"
            fullWidth
            variant="standard"
            value={formData.payment_type}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="station_name"
            name="station_name"
            label="Nombre de la Estación"
            fullWidth
            variant="standard"
            value={formData.station_name}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="city_id"
            name="city_id"
            label="ID de la Ciudad"
            fullWidth
            variant="standard"
            type="number"
            value={formData.city_id}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="manager_id"
            name="manager_id"
            label="ID del Manager"
            fullWidth
            variant="standard"
            value={formData.manager_id}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="manager_start_date"
            name="manager_start_date"
            label="Fecha de Inicio del Manager"
            fullWidth
            variant="standard"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.manager_start_date}
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
