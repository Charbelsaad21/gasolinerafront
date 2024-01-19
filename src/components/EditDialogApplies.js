import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditDialogApplies({ open, onClose, data }) {
  const [modalityId, setModalityId] = React.useState(data ? data.modality_id : '');
  const [cityId, setCityId] = React.useState(data ? data.city_id : '');
  const [appliesStartDate, setAppliesStartDate] = React.useState(data ? data.aplies_start_date : '');
  const [appliesEndDate, setAppliesEndDate] = React.useState(data ? data.aplies_end_date : '');

  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    setModalityId(data ? data.modality_id : '');
    setCityId(data ? data.city_id : '');
    setAppliesStartDate(data ? data.aplies_start_date : '');
    setAppliesEndDate(data ? data.aplies_end_date : '');
  }, [data]);

  const handleEditApplies = async () => {
    try {
      const response = await fetch('http://localhost:8000/applies/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modality_id: modalityId,
          city_id: cityId,
          aplies_start_date: appliesStartDate,
          aplies_End_date: appliesEndDate,
        }),
      });

      if (response.ok) {
        console.log('Aplicación actualizada con éxito');
      } else {
        console.error('Error al actualizar la aplicación');
      }
    } catch (error) {
      console.error('Error de red', error);
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Aplicación</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="appliesEndDate"
          label="Fecha de Fin de Aplicación"
          type="date"
          fullWidth
          value={appliesEndDate}
          onChange={(e) => setAppliesEndDate(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleEditApplies} color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
