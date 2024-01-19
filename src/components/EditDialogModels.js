import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditDialogModels({ open, onClose, data }) {
  const [modelName, setModelName] = React.useState(data ? data.model_name : '');
  const [brand, setBrand] = React.useState(data ? data.brand : '');
  const [typeVehicle, setTypeVehicle] = React.useState(data ? data.type_vehicle : '');

  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    setModelName(data ? data.model_name : '');
    setBrand(data ? data.brand : '');
    setTypeVehicle(data ? data.type_vehicle : '');
  }, [data]);

  const handleEditModel = async () => {
    try {
      const response = await fetch('http://localhost:8000/models/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mod_name: modelName,
          brand: brand,
          type_vehicle: typeVehicle,
        }),
      });

      if (response.ok) {
        console.log('Modelo actualizado con éxito');
      } else {
        console.error('Error al actualizar el modelo');
      }
    } catch (error) {
      console.error('Error de red', error);
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Modelo</DialogTitle>
      <DialogContent>

        <TextField
          margin="dense"
          id="brand"
          label="Marca"
          fullWidth
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <TextField
          margin="dense"
          id="typeVehicle"
          label="Tipo de Vehículo"
          fullWidth
          value={typeVehicle}
          onChange={(e) => setTypeVehicle(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleEditModel} color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
