import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteDialog from './DeleteDialog';
import EditDialog from './EditDialog';
import Vehicles from '../pages/Vehicles';
import AddDialogVehicles from './AddDialogVehicles';
import EditDialogVehicles from './EditDialogVehicles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:  "#6A041D",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
})); 

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function TableVehicles({title, data}) {

  const deleteVehicles = async () => {
    try {
      console.log(selectedId.plateTT)
      const response = await fetch(`http://localhost:8000/vehicles/delete/${selectedId.plate}`, {
        method: 'DELETE',
      });
     
      if (response.ok) {
        console.log('Camion de cisterna eliminado con éxito');
        
      } else {
        console.error('Error al eliminar el conductor');
      }
    } catch (error) {
      console.error('Error de red', error);
    } finally {
      handleCloseDialog();
    }
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const [dialogEditOpen, setDialogEditOpen] = useState(false);

  const [dialogAddOpen, setDialogAddOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(null)

  const handleOpenDialog = (id) => {
    setSelectedId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedId(null);
    setDialogOpen(false);
  };

  const handleDialogEditOpen = (id) => {
    setSelectedId(id);
    setDialogEditOpen(true);
  };

  const handleDialogEditClose = () => {
    setSelectedId(null);
    setDialogEditOpen(false);
  };

  const handleDialogAddOpen = () => {
    setDialogAddOpen(true);
  };

  const handleDialogAddClose = () => {
    setDialogAddOpen(false);
  };

function createData(plate, model, capacity, year_release, serial_bodywork, serial_chassis, owner_id) {
    return { plate, model, capacity, year_release, serial_bodywork, serial_chassis, owner_id };
  }
  
  const rows = data.map(Vehicles => createData(Vehicles.plate, Vehicles.model, Vehicles.capacity, Vehicles.year_release, Vehicles["serial_bodywork "], Vehicles.serial_chassis, Vehicles.owner_id));
  
 
  
    

  return (
    <>
      <TableContainer component={Paper} sx={{ marginLeft: 31, marginTop: 10, maxWidth: 'calc(100% - 250px)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor:  "#6A041D"}}>
          <IconButton aria-label="add" color="#FFF" onClick={handleDialogAddOpen}>
            <AddIcon sx={{color: "#FFF"}}/>
          </IconButton>
        </div>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
          <TableRow>
            <StyledTableCell>Placa </StyledTableCell>
            <StyledTableCell>Modelo</StyledTableCell>
            <StyledTableCell>Capacidad</StyledTableCell>
            <StyledTableCell>Año de Lanzamiento</StyledTableCell>
            <StyledTableCell>Carroceria serie</StyledTableCell>
            <StyledTableCell>Serial Chasis</StyledTableCell>
            <StyledTableCell>ID Dueño</StyledTableCell>
            <StyledTableCell align="right">Acciones</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>

        {rows.map((row) => (
        <StyledTableRow key={row.plate}>
            <StyledTableCell component="th" scope="row">
            {row.plate}
            </StyledTableCell>
            <StyledTableCell>{row.model}</StyledTableCell>
            <StyledTableCell>{row.capacity}</StyledTableCell>
            <StyledTableCell>{row.year_release}</StyledTableCell>
            <StyledTableCell>{row.serial_bodywork}</StyledTableCell>
            <StyledTableCell>{row.serial_chassis}</StyledTableCell>
            <StyledTableCell>{row.owner_id}</StyledTableCell>
            <StyledTableCell align="right">{/* Acciones */}
            <React.Fragment>
                <IconButton aria-label="edit" color="#000" onClick={() => handleDialogEditOpen(row)}>
                <EditIcon  />
                </IconButton>
            </React.Fragment> 
            <React.Fragment>
                <IconButton aria-label="delete" color="#000" onClick={() => handleOpenDialog(row)}>
                <DeleteIcon />
                </IconButton>
            </React.Fragment>      
            </StyledTableCell>
        </StyledTableRow>
        ))}
   
            
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteDialog open={dialogOpen} onClose={handleCloseDialog} onDelete={deleteVehicles} />
      <EditDialogVehicles open={dialogEditOpen} onClose={handleDialogEditClose} data={selectedId}/>
      <AddDialogVehicles open={dialogAddOpen} onClose={handleDialogAddClose} />
    </>
  );
  
}
