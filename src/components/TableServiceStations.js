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
import ServiceStations from '../pages/ServiceStations';
import AddDialogServiceStations from './AddDialogServiceStations';
import EditDialogServiceStations from './EditDialogServiceStation';

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



export default function TableServiceStations({title, data}) {
  const deleteServiceStations = async () => {
    try {
      // Hacer la solicitud de eliminación al servidor utilizando selectedDriverId
      const response = await fetch(`http://localhost:8000/service-stations/delete/${selectedId.station_id}`, {
        method: 'DELETE',
      });

      // Manejar la respuesta del servidor (puedes mostrar un mensaje de éxito, actualizar la lista, etc.)
      if (response.ok) {
        console.log('Estado eliminado con éxito');
        // Puedes recargar la lista de conductores o realizar otras acciones después de la eliminación
      } else {
        console.error('Error al eliminar el Estado');
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

    function createData(station_rif, adress, amount_of_fuel, payment_type, station_name, city_id, manager_id, manager_start_date) {
      return {station_rif, adress, amount_of_fuel, payment_type, station_name, city_id, manager_id, manager_start_date};
    }
    
    const rows = data.map(ServiceStations => createData(
      ServiceStations["station_rif "].trim(),
      ServiceStations.adress,
      ServiceStations.amount_of_fuel,
      ServiceStations.payment_type,
      ServiceStations.station_name,
      ServiceStations["city_id "],  // Eliminar .trim() de aquí
      ServiceStations.manager_id,
      ServiceStations.manager_start_date
    ));
    


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
            <StyledTableCell>RIF </StyledTableCell>
            <StyledTableCell>Direccion</StyledTableCell>
            <StyledTableCell>Cantidad de Combustible</StyledTableCell>
            <StyledTableCell>Tipo de Pago</StyledTableCell>
            <StyledTableCell>Nombre de la Estacion</StyledTableCell>
            <StyledTableCell>ID Ciudad</StyledTableCell>
            <StyledTableCell>ID Encargado</StyledTableCell>
            <StyledTableCell>Fecha de Inicio de Encargado</StyledTableCell>
            <StyledTableCell align="right">Acciones</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {console.log(rows)}
        {rows.map((row) => (
        <StyledTableRow key={row.station_rif}>
            <StyledTableCell component="th" scope="row">
            {row.station_rif}
            </StyledTableCell>
            <StyledTableCell>{row.adress}</StyledTableCell>
            <StyledTableCell>{row.amount_of_fuel}</StyledTableCell>
            <StyledTableCell>{row.payment_type}</StyledTableCell>
            <StyledTableCell>{row.station_name}</StyledTableCell>
            <StyledTableCell>{row.city_id}</StyledTableCell>
            <StyledTableCell>{row.manager_id}</StyledTableCell>
            <StyledTableCell>{row.manager_start_date}</StyledTableCell>
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
      <DeleteDialog open={dialogOpen} onClose={handleCloseDialog} onDelete={deleteServiceStations} />
      <EditDialogServiceStations open={dialogEditOpen} onClose={handleDialogEditClose} data={selectedId}/>
      <AddDialogServiceStations open={dialogAddOpen} onClose={handleDialogAddClose} />
    </>
  );
  
}
