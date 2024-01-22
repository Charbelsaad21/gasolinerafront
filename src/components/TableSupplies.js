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
import AddDialogWorksIn from './AddDialogSupplies';
import AddDialogSupplies from './AddDialogSupplies';
import EditDialogSupplies from './EditDialogSupplies';


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



export default function TableSupplies({title, data}) {

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

  const deleteSupplies= async () => {
    try {
      const response = await fetch(`http://localhost:8000/supplies/delete/${selectedId.station_rif}/${selectedId.Supplies_date}/${selectedId.plateTT}/${selectedId.driver_id}`, {
        method: 'DELETE',
      });

      
      if (response.ok) {
        console.log('Driver eliminado con éxito');
        
      } else {
        console.error('Error al eliminar el conductor');
      }
    } catch (error) {
      console.error('Error de red', error);
    } finally {
      handleCloseDialog();
    }
  };
  

function createData(station_rif,plate,Supplies_date,liters,driver_id,plateTT) {
    return { station_rif,plate,Supplies_date,liters,driver_id,plateTT};
  }
  
  const rows = data.map(Supplies => createData(Supplies.station_rif,Supplies.plate,Supplies.Supplies_date,Supplies.liters,Supplies.driver_id,Supplies.plateTT));
  

 
  
    

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
            <StyledTableCell>Fecha de Suministro</StyledTableCell>
            <StyledTableCell>litro Suministrado</StyledTableCell>
            <StyledTableCell>ID conductor</StyledTableCell>
            <StyledTableCell>Placa del Cisterna</StyledTableCell>
            <StyledTableCell align="right">Acciones</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>


        {rows.map((row) => (
         <StyledTableRow key={`${row.station_rif}-${row.plate}-${row.Supplies_date}-${row.driver_id}`}>
            <StyledTableCell component="th" scope="row">
            {row.station_rif}
            </StyledTableCell>
            <StyledTableCell>{row.Supplies_date}</StyledTableCell>
            <StyledTableCell>{row.liters}</StyledTableCell>
            <StyledTableCell>{row.driver_id}</StyledTableCell>
            <StyledTableCell>{row.plateTT}</StyledTableCell>
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
      <DeleteDialog open={dialogOpen} onClose={handleCloseDialog} onDelete={deleteSupplies} />
      <EditDialogSupplies open={dialogEditOpen} onClose={handleDialogEditClose}  data={selectedId}/>
      <AddDialogSupplies open={dialogAddOpen} onClose={handleDialogAddClose}/>
    </>
  );
  
}
