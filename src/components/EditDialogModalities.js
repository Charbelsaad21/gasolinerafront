import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditDialogModalities({ open, onClose, data }) {
  const [modalityId, setModalityId] = React.useState(data ? data.modality_id : '');
  const [descrpt, setDescrpt] = React.useState(data ? data.descrpt : '');

  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    setDescrpt(data ? data.descrpt : '')
  }, [data])

  const handleEditModality = async () => {
    try {
      const response = await fetch('http://localhost:8000/modalities/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modality_id: data.modality_id, 
          descrpt: descrpt,
        }),
      });
  
      if (response.ok) {
        console.log('Modalidad actualizada con éxito');
      } else {
        console.error('Error al actualizar la modalidad');
      }
    } catch (error) {
      console.error('Error de red', error);
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Modalidad</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="descrpt"
          label="Descripción"
          fullWidth
          value={descrpt}
          onChange={(e) => setDescrpt(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleEditModality} color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
