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
import AddDialogEmployeesPhones from './AddDialogEmployeesPhones';


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


export default function TableEmployeesPhones({title, data}) {

  const deleteEmployeesPhone = async () => {
    try {
      console.log(selectedId.plateTT)
      const response = await fetch(`http://localhost:8000/employees-phones/delete/${selectedId.emp_id}/${selectedId.phone_number_emp}`, {
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
    const [selectedId, setSelectedId] = useState(null);
    const [dialogEditOpen, setDialogEditOpen] = useState(false);
    const [dialogAddOpen, setDialogAddOpen] = useState(false);
  
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
  


   
function createData(emp_id,phone_number_emp) {
    return {emp_id,phone_number_emp};
  }
  
  const rows = data.map(EmployeesPhones => createData(EmployeesPhones.emp_id,EmployeesPhones.phone_number_emp));
  

 
  
    

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
            <StyledTableCell>ID Empleado</StyledTableCell>
            <StyledTableCell>Numero de Telefono</StyledTableCell>
            <StyledTableCell align="right">Acciones</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>


        {rows.map((row) => (
         <StyledTableRow key={`${row.emp_id}-${row.iphone_number_ep}`}>
            <StyledTableCell component="th" scope="row">
            {row.emp_id}
            </StyledTableCell>
            <StyledTableCell>{row.phone_number_emp}</StyledTableCell>
            <StyledTableCell align="right">{/* Acciones */}
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
      <DeleteDialog open={dialogOpen} onClose={handleCloseDialog} onDelete={deleteEmployeesPhone} />
      <AddDialogEmployeesPhones open={dialogAddOpen} onClose={handleDialogAddClose} />
    </>
  );
  
}
