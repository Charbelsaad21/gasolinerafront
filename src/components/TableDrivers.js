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
import AddDialogDrivers from './AddDialogDrivers';
import EditDialogDrivers from './EditDialogDrivers';

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function TableDrivers({title, data}) {

    const [dialogOpen, setDialogOpen] = useState(false);

    const [selectedId, setSelectedId] = useState(null);

    const deleteDrivers = async () => {
      try {
       
        const response = await fetch(`http://localhost:8000/drivers/delete/${selectedId.driver_id}`, {
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

    function createData(driver_id, driver_name) {
      return { driver_id, driver_name };
    }

    const rows = data.map(driver => createData(driver.driver_id, driver.driver_name));
  

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
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="right">Acciones</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.driver_id}>
              <StyledTableCell component="th" scope="row">
                {row.driver_id}
              </StyledTableCell>
              <StyledTableCell>{row.driver_name}</StyledTableCell>
              <StyledTableCell align="right">
                {/* Acciones */}
                <React.Fragment>
                  <IconButton aria-label="edit" color="#000" onClick={() => handleDialogEditOpen(row)}>
                    <EditIcon />
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
      <DeleteDialog open={dialogOpen} onClose={handleCloseDialog} onDelete={deleteDrivers} />
      <EditDialogDrivers open={dialogEditOpen} onClose={handleDialogEditClose} data={selectedId}/>
      <AddDialogDrivers open={dialogAddOpen} onClose={handleDialogAddClose} />
    </>
  );
  
}
