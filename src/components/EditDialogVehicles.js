import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditDialogVehicles({ open, onClose, data }) {
  const [plate, setPlate] = React.useState(data ? data.plate : '');
  const [model, setModel] = React.useState(data ? data.model : '');
  const [capacity, setCapacity] = React.useState(data ? data.capacity : '');
  const [yearRelease, setYearRelease] = React.useState(data ? data.year_release : '');
  const [serialBodywork, setSerialBodywork] = React.useState(data ? data.serial_bodywork : '');
  const [serialChassis, setSerialChassis] = React.useState(data ? data.serial_chassis : '');
  const [ownerId, setOwnerId] = React.useState(data ? data.owner_id : '');

  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    setPlate(data ? data.plate : '');
    setModel(data ? data.model : '');
    setCapacity(data ? data.capacity : '');
    setYearRelease(data ? data.year_release : '');
    setSerialBodywork(data ? data.serial_bodywork : '');
    setSerialChassis(data ? data.serial_chassis : '');
    setOwnerId(data ? data.owner_id : '');
  }, [data])

  const handleEditVehicle = async () => {
    try {
      const response = await fetch('http://localhost:8000/vehicles/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plate: plate,
          model: model,
          capacity: capacity,
          year_release: yearRelease,
          serial_bodywork: serialBodywork,
          serial_chassis: serialChassis,
          owner_id: ownerId,
        }),
      });

      if (response.ok) {
        console.log('Vehículo actualizado con éxito');
      } else {
        console.error('Error al actualizar el vehículo');
      }
    } catch (error) {
      console.error('Error de red', error);
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Vehículo</DialogTitle>
      <DialogContent>    

        <TextField
          margin="dense"
          id="capacity"
          label="Capacidad"
          type="number"
          fullWidth
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />

        <TextField
          margin="dense"
          id="yearRelease"
          label="Año de Fabricación"
          type="number"
          fullWidth
          value={yearRelease}
          onChange={(e) => setYearRelease(e.target.value)}
        />

        <TextField
          margin="dense"
          id="serialBodywork"
          label="Serial de Carrocería"
          fullWidth
          value={serialBodywork}
          onChange={(e) => setSerialBodywork(e.target.value)}
        />

        <TextField
          margin="dense"
          id="serialChassis"
          label="Serial de Chasis"
          fullWidth
          value={serialChassis}
          onChange={(e) => setSerialChassis(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleEditVehicle} color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
