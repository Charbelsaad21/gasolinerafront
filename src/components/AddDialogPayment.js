import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddDialogPayments({ open, onClose }) {
  const handleClose = () => {
    onClose(false);
  };

  const handleAddPayment = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
  
    // Convertir el valor de "amount" a número
    formJson.amount = parseFloat(formJson.amount);
  
    try {
      console.log(JSON.stringify(formJson))
      const response = await fetch('http://localhost:8000/payments/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });
  
      if (response.ok) {
        console.log('Pago agregado con éxito');
      } else {
        console.error('Error al agregar el pago');
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
          onSubmit: handleAddPayment,
        }}
      >
        <DialogTitle>Agregar Pago</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="payment_id"
            name="payment_id"
            label="ID del Pago"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="payment_date"
            name="payment_date"
            label="Fecha del Pago"
            fullWidth
            variant="standard"
            type="date"
          />
          <TextField
            required
            margin="dense"
            id="amount"
            name="amount"
            label="Monto"
            fullWidth
            variant="standard"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
          />
          <TextField
            required
            margin="dense"
            id="payment_type"
            name="payment_type"
            label="Tipo de Pago"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="card_number"
            name="card_number"
            label="Número de Tarjeta"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="bank"
            name="bank"
            label="Banco"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="currency"
            name="currency"
            label="Moneda"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="station_rif"
            name="station_rif"
            label="RIF de la Estación"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="plate"
            name="plate"
            label="Placa del Vehículo"
            fullWidth
            variant="standard"
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
