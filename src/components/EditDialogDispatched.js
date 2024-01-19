import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditDialogDispatched({ open, onClose, data }) {
  const [stationRif, setStationRif] = React.useState(data ? data.station_rif : '');
  const [plate, setPlate] = React.useState(data ? data.plate : '');
  const [dispatchDate, setDispatchDate] = React.useState(data ? data.dispatch_date : '');
  const [liters, setLiters] = React.useState(data ? data.liters : '');
  const [bs, setBs] = React.useState(data ? data.Bs : '');

  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    console.log(data)
    setStationRif(data ? data.station_rif : '');
    setPlate(data ? data.plate : '');
    setDispatchDate(data ? data.dispatch_date : '');
    setLiters(data ? data.liters : '');
    setBs(data ? data.Bs : '');
  }, [data]);

  const handleEditDispatched = async () => {
    try {
      const response = await fetch('http://localhost:8000/dispatched/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          station_rif: stationRif,
          plate: plate,
          dispatch_date: dispatchDate,
          liters: liters,
          bs: bs,
        }),
      });

      if (response.ok) {
        console.log('Registro de despacho actualizado con éxito');
      } else {
        console.error('Error al actualizar el registro de despacho');
      }
    } catch (error) {
      console.error('Error de red', error);
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Registro de Despacho</DialogTitle>
      <DialogContent>

        <TextField
          margin="dense"
          id="liters"
          label="Litros"
          type="number"
          fullWidth
          value={liters}
          onChange={(e) => setLiters(e.target.value)}
        />

        <TextField
          margin="dense"
          id="bs"
          label="Bs"
          fullWidth
          value={bs}
          onChange={(e) => setBs(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleEditDispatched} color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
