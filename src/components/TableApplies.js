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
import AddDialogApplies from './AddDialogApplies';
import EditDialogApplies from './EditDialogApplies';


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



export default function TableApplies({title, data}) {

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const deleteApplies = async () => {
    try {
     
      const response = await fetch(`http://localhost:8000/applies/delete/${selectedId.modality_id}/${selectedId.city_id}/${selectedId.aplies_start_date}`, {
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

  const handleOpenDialog = (id) => {
    setSelectedId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedId(null);
    setDialogOpen(false);
  };

  const [dialogEditOpen, setDialogEditOpen] = useState(false);

  const handleDialogEditOpen = (id) => {
    setSelectedId(id);
    setDialogEditOpen(true);
  };

  const handleDialogEditClose= () => {
    setSelectedId(null);
    setDialogEditOpen(false);
  };

  const [dialogAddOpen, setDialogAddOpen] = useState(false);

  const handleDialogAddOpen = () => {
    setDialogAddOpen(true);
  };

  const handleDialogAddClose= () => {
    setDialogAddOpen(false);
  };
  

function createData(modality_id,city_id,aplies_start_date,aplies_End_date) {
    return {modality_id,city_id,aplies_start_date,aplies_End_date};
  }
  
  const rows = data.map(Applies => createData(Applies.modality_id,Applies.city_id,Applies.aplies_start_date,Applies.aplies_End_date));
  

 
  
    

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
            <StyledTableCell>ID Modalidad</StyledTableCell>
            <StyledTableCell>ID Ciudad</StyledTableCell>
            <StyledTableCell>Fecha de Inicio </StyledTableCell>
            <StyledTableCell>Fecha Final</StyledTableCell>
            <StyledTableCell align="right">Acciones</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>


        {rows.map((row) => (
         <StyledTableRow key={`${row.modality_id}-${row.city_id}-${row.aplies_start_date}`}>
            <StyledTableCell component="th" scope="row">
            {row.modality_id}
            </StyledTableCell>
            <StyledTableCell>{row.city_id}</StyledTableCell>
            <StyledTableCell>{row.aplies_start_date}</StyledTableCell>
            <StyledTableCell>{row.aplies_End_date}</StyledTableCell>
            <StyledTableCell align="right">{/* Acciones */}
            <React.Fragment>
                <IconButton aria-label="edit" color="#000"onClick={() => handleDialogEditOpen(row)}>
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
      <DeleteDialog open={dialogOpen} onClose={handleCloseDialog} onDelete={deleteApplies}/>
      <EditDialogApplies open={dialogEditOpen} onClose={handleDialogEditClose} data={selectedId}/>
      <AddDialogApplies open={dialogAddOpen} onClose={handleDialogAddClose} />
    </>
  );
  
}
