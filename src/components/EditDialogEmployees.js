import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditDialogEmployees({ open, onClose, data }) {
  const [empId, setEmpId] = React.useState(data ? data.emp_id : '');
  const [firstName, setFirstName] = React.useState(data ? data.first_name : '');
  const [lastName, setLastName] = React.useState(data ? data.last_name : '');
  const [adress, setAdress] = React.useState(data ? data.adress : '');
  const [email, setEmail] = React.useState(data ? data.email : '');

  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    setEmpId(data ? data.emp_id : ''); 
    setFirstName(data ? data.first_name : '');
    setLastName(data ? data.last_name : '');
    setAdress(data ? data.adress : '');
    setEmail(data ? data.email : '');
  }, [data])

  const handleEditEmployee = async () => {
    try {
      const response = await fetch('http://localhost:8000/employee/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emp_id: empId,
          first_name: firstName,
          last_name: lastName,
          adress: adress,
          email: email,
        }),
      });
  
      if (response.ok) {
        console.log('Empleado actualizado con éxito');
      } else {
        console.error('Error al actualizar el Empleado');
      }
    } catch (error) {
      console.error('Error de red', error);
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Empleado</DialogTitle>
      <DialogContent>    
        <TextField
            margin="dense"
            id="firstName"
            label="Primer Nombre"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
        />

        <TextField
            margin="dense"
            id="lastName"
            label="Apellido"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
        />

        <TextField
            margin="dense"
            id="adress"
            label="Dirección"
            fullWidth
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
        />

        <TextField
            margin="dense"
            id="email"
            label="Correo Electrónico"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleEditEmployee} color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
