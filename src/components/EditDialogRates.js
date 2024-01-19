import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditDialogRates({ open, onClose, data }) {
  const [rateDate, setRateDate] = React.useState(data ? data.rate_date : '');
  const [ratesValue, setRatesValue] = React.useState(data ? data.rates_value : '');

  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    setRateDate(data ? data.rate_date : ''); 
    setRatesValue(data ? data.rates_value : '');
  }, [data]);

  const handleEditRate = async () => {
    try {
      console.log(rateDate, ratesValue)
      const response = await fetch('http://localhost:8000/rates/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rate_date: rateDate,
          rates_value: ratesValue,
        }),
      });

      if (response.ok) {
        console.log('Tasa actualizada con éxito');
      } else {
        console.error('Error al actualizar la tasa');
      }
    } catch (error) {
      console.error('Error de red', error);
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Tasa</DialogTitle>
      <DialogContent>    

        <TextField
          margin="dense"
          id="ratesValue"
          label="Valor de la Tasa"
          type="number"
          fullWidth
          value={ratesValue}
          onChange={(e) => setRatesValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleEditRate} color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
