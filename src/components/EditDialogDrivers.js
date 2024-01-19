import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditDialogDrivers({ open, onClose, data }) {
  const [driverName, setDriverName] = React.useState(data ? data.driver_name : '');

  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    setDriverName(data ? data.driver_name : '')
  }, [data])

  const handleEditDriver = async () => {
    try {
      const response = await fetch('http://localhost:8000/drivers/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          driver_id: data.driver_id, 
          driver_name: driverName,
        }),
      });
  
      if (response.ok) {
        console.log('Conductor actualizado con éxito');
      } else {
        console.error('Error al actualizar el conductor');
      }
    } catch (error) {
      console.error('Error de red', error);
    } finally {
      handleClose();
    }
  };
  

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Conductor</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="driverName"
          label="Nombre del Conductor"
          fullWidth
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleEditDriver} color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
