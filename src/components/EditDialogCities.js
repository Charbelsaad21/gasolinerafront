import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditDialogCities({ open, onClose, data }) {
  const [cityName, setCityName] = React.useState(data ? data.city_name : '');
  const [stateId, setStateId] = React.useState(data ? data.state_id : '');

  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    setCityName(data ? data.city_name : '')
  }, [data])

  const handleEditCity = async () => {
    try {
      const response = await fetch('http://localhost:8000/cities/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city_id: data.city_id, 
          city_name: cityName,
          state_id: stateId,
        }),
      });
  
      if (response.ok) {
        console.log('Ciudad actualizada con éxito');
      } else {
        console.error('Error al actualizar la ciudad');
      }
    } catch (error) {
      console.error('Error de red', error);
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Ciudad</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="cityName"
          label="Nombre de la Ciudad"
          fullWidth
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleEditCity} color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
