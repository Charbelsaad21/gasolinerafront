import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditDialogSupplies({ open, onClose, data }) {
  const [stationRif, setStationRif] = React.useState(data ? data.station_rif : '');
  const [suppliesDate, setSuppliesDate] = React.useState(data ? data.Supplies_date : '');
  const [liters, setLiters] = React.useState(data ? data.liters : '');
  const [driverId, setDriverId] = React.useState(data ? data.driver_id : '');
  const [plateTT, setPlateTT] = React.useState(data ? data.plateTT : '');

  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    setStationRif(data ? data.station_rif : '');
    setSuppliesDate(data ? data.Supplies_date : '');
    setLiters(data ? data.liters : '');
    setDriverId(data ? data.driver_id : '');
    setPlateTT(data ? data.plateTT : '');
  }, [data]);

  const handleEditSupplies = async () => {
    try {
      console.log(stationRif, suppliesDate, liters, driverId, plateTT)
      const response = await fetch('http://localhost:8000/supplies/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          station_rif: stationRif,
          Supplies_date: suppliesDate,
          liters: liters,
          driver_id: driverId,
          plateTT: plateTT,
        }),
      });

      if (response.ok) {
        console.log('Suministro actualizado con éxito');
      } else {
        console.error('Error al actualizar el suministro');
      }
    } catch (error) {
      console.error('Error de red', error);
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Suministro</DialogTitle>
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

        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleEditSupplies} color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
