import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditDialogOwners({ open, onClose, data }) {
  const [ownerId, setOwnerId] = React.useState(data ? data.owner_id : '');
  const [email, setEmail] = React.useState(data ? data.email : '');
  const [ownerName, setOwnerName] = React.useState(data ? data.owner_name : '');

  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    setOwnerId(data ? data.owner_id : ''); 
    setEmail(data ? data.email : '');
    setOwnerName(data ? data.owner_name : '');
  }, [data]);

  const handleEditOwner = async () => {
    try {
      const response = await fetch('http://localhost:8000/owners/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          owner_id: ownerId,
          email: email,
          owner_name: ownerName,
        }),
      });

      if (response.ok) {
        console.log('Propietario actualizado con éxito');
      } else {
        console.error('Error al actualizar el propietario');
      }
    } catch (error) {
      console.error('Error de red', error);
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Propietario</DialogTitle>
      <DialogContent>    
        <TextField
          margin="dense"
          id="email"
          label="Correo Electrónico"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          margin="dense"
          id="ownerName"
          label="Nombre del Propietario"
          fullWidth
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleEditOwner} color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
