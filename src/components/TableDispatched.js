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
import AddDialogDispatched from './AddDialogDispatched';
import EditDialogDispatched from './EditDialogDispatched';


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



export default function TableDispatched({title, data}) {

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

  function createData(station_rif,plate,dispatch_date,liters,Bs) {
    return { station_rif,plate,dispatch_date,liters,Bs};
  }
  
  const rows = data.map(Dispatched => createData(Dispatched.station_rif,Dispatched.plate,Dispatched.dispatch_date,Dispatched.liters,Dispatched.Bs));
  
 
  
    

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
            <StyledTableCell>RIF Estacion</StyledTableCell>
            <StyledTableCell>Placa</StyledTableCell>
            <StyledTableCell>Fecha de Despacho</StyledTableCell>
            <StyledTableCell>Litros</StyledTableCell>
            <StyledTableCell>BS</StyledTableCell>
            <StyledTableCell align="right">Acciones</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>

        {rows.map((row) => (
         <StyledTableRow key={`${row.station_rif}-${row.plate}-${row.dispatch_date}`}>
            <StyledTableCell component="th" scope="row">
            {row.station_rif}
            </StyledTableCell>
            <StyledTableCell>{row.plate}</StyledTableCell>
            <StyledTableCell>{row.dispatch_date}</StyledTableCell>
            <StyledTableCell>{row.liters}</StyledTableCell>
            <StyledTableCell>{row.Bs}</StyledTableCell>
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
      <DeleteDialog open={dialogOpen} onClose={handleCloseDialog} />
      <EditDialogDispatched open={dialogEditOpen} onClose={handleDialogEditClose} data={selectedId}/>
      <AddDialogDispatched open={dialogAddOpen} onClose={handleDialogAddClose} />
    </>
  );
  
}
