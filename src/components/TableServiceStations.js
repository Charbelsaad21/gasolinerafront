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

    const [dialogOpen, setDialogOpen] = useState(false);
  
    const handleOpenDialog = () => {
      setDialogOpen(true);
    };
  
    const handleCloseDialog = () => {
      setDialogOpen(false);
    };

    const [dialogEditOpen, setDialogEditOpen] = useState(false);
  
    const handleDialogEditOpen = () => {
      setDialogEditOpen(true);
    };
  
    const handleDialogEditClose= () => {
      setDialogEditOpen(false);
    };

    const [dialogAddOpen, setDialogAddOpen] = useState(false);
  
    const handleDialogAddOpen = () => {
      setDialogAddOpen(true);
    };
  
    const handleDialogAddClose= () => {
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
                <IconButton aria-label="edit" color="#000" onClick={handleDialogEditOpen}>
                <EditIcon  />
                </IconButton>
            </React.Fragment> 
            <React.Fragment>
                <IconButton aria-label="delete" color="#000" onClick={handleOpenDialog}>
                <DeleteIcon />
                </IconButton>
            </React.Fragment>      
            </StyledTableCell>
        </StyledTableRow>
        ))}
   
            
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteDialog open={dialogOpen} onClose={handleCloseDialog} />
      <EditDialog open={dialogEditOpen} onClose={handleDialogEditClose} title={"Editar "+ title}/>
      <EditDialog open={dialogAddOpen} onClose={handleDialogAddClose}  title={"Agregar "+ title}/>
    </>
  );
  
}
