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
import States from '../pages/States';

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



export default function TableStates({title, data}) {

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

    function createData(state_id,state_name) {
      return {state_id, state_name };
    }

    const rows = data.map(states=> createData(states.state_id,states.state_name));
  

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
            <StyledTableCell>ID del Estado</StyledTableCell>
            <StyledTableCell>Nombre del Estado</StyledTableCell>
            <StyledTableCell align="right">Acciones</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.state_id}>
                <StyledTableCell component="th" scope="row">
                  {row.state_id}
                </StyledTableCell>
                <StyledTableCell>{row.state_name}</StyledTableCell>
                <StyledTableCell align="right">
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