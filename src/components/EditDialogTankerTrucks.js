import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditDialogTankerTrucks({ open, onClose, data }) {
  const [plateTT, setPlateTT] = React.useState(data ? data.plateTT : '');
  const [capacityLit, setCapacityLit] = React.useState(data ? data.capacity_lit : '');

  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    setCapacityLit(data ? data.capacity_lit : '')
  }, [data])

  const handleEditTankerTruck = async () => {
    try {
        console.log(plateTT,capacityLit)
      const response = await fetch('http://localhost:8000/tanker-trucks/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plateTT: data.plateTT, 
          capacity_lit: capacityLit,
        }),
      });
  
      if (response.ok) {
        console.log('Camión cisterna actualizado con éxito');
      } else {
        console.error('Error al actualizar el camión cisterna');
      }
    } catch (error) {
      console.error('Error de red', error);
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Camión Cisterna</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="capacityLit"
          label="Capacidad en Litros"
          fullWidth
          value={capacityLit}
          onChange={(e) => setCapacityLit(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleEditTankerTruck} color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
