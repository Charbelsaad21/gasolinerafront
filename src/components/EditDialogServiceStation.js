import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditDialogServiceStations({ open, onClose, data }) {
  const [stationRif, setStationRif] = React.useState(data ? data.station_rif : '');
  const [adress, setAdress] = React.useState(data ? data.adress : '');
  const [amountOfFuel, setAmountOfFuel] = React.useState(data ? data.amount_of_fuel : '');
  const [paymentType, setPaymentType] = React.useState(data ? data.payment_type : '');
  const [stationName, setStationName] = React.useState(data ? data.station_name : '');
  const [cityId, setCityId] = React.useState(data ? data.city_id : '');
  const [managerId, setManagerId] = React.useState(data ? data.manager_id : '');
  const [managerStartDate, setManagerStartDate] = React.useState(data ? data.manager_start_date : '');

  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    setStationRif(data ? data.station_rif : ''); 
    setAdress(data ? data.adress : '');
    setAmountOfFuel(data ? data.amount_of_fuel : '');
    setPaymentType(data ? data.payment_type : '');
    setStationName(data ? data.station_name : '');
    setCityId(data ? data.city_id : '');
    setManagerId(data ? data.manager_id : '');
    setManagerStartDate(data ? data.manager_start_date : '');
  }, [data])

  const handleEditServiceStation = async () => {
    try {
      const response = await fetch('http://localhost:8000/service-stations/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          station_rif: stationRif,
          adress: adress,
          amount_of_fuel: amountOfFuel,
          payment_type: paymentType,
          station_name: stationName,
          city_id: cityId,
          manager_id: managerId,
          manager_start_date: managerStartDate,
        }),
      });
  
      if (response.ok) {
        console.log('Estación de Servicio actualizada con éxito');
      } else {
        console.error('Error al actualizar la Estación de Servicio');
      }
    } catch (error) {
      console.error('Error de red', error);
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Estación de Servicio</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="adress"
          label="Dirección"
          fullWidth
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
        />
        <TextField
          margin="dense"
          id="amountOfFuel"
          label="Cantidad de Combustible"
          fullWidth
          value={amountOfFuel}
          onChange={(e) => setAmountOfFuel(e.target.value)}
        />
        <TextField
          margin="dense"
          id="paymentType"
          label="Tipo de Pago"
          fullWidth
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
        />
        <TextField
          margin="dense"
          id="stationName"
          label="Nombre de la Estación"
          fullWidth
          value={stationName}
          onChange={(e) => setStationName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="cityId"
          label="ID de la Ciudad"
          fullWidth
          value={cityId}
          onChange={(e) => setCityId(e.target.value)}
        />
        <TextField
          margin="dense"
          id="managerId"
          label="ID del Gerente"
          fullWidth
          value={managerId}
          onChange={(e) => setManagerId(e.target.value)}
        />
        <TextField
          margin="dense"
          id="managerStartDate"
          label="Fecha de Inicio del Gerente"
          fullWidth
          type="date"
          value={managerStartDate}
          onChange={(e) => setManagerStartDate(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleEditServiceStation} color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
