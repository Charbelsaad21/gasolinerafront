import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditDialogStates({ open, onClose, data }) {
  const [stateId, setStateId] = React.useState(data ? data.state_id : '');
  const [stateName, setStateName] = React.useState(data ? data.state_name : '');

  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    setStateId(data ? data.state_id : '')
    setStateName(data ? data.state_name : '')
  }, [data])

  const handleEditState = async () => {
    try {
      const response = await fetch('http://localhost:8000/states/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          state_id: stateId, 
          state_name: stateName,
        }),
      });
  
      if (response.ok) {
        console.log('Estado actualizado con éxito');
      } else {
        console.error('Error al actualizar el estado');
      }
    } catch (error) {
      console.error('Error de red', error);
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Estado</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="stateName"
          label="Nombre del Estado"
          fullWidth
          value={stateName}
          onChange={(e) => setStateName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleEditState} color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
