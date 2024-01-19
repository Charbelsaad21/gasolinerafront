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
import Models from '../pages/Models';
import AddDialogModalities from './AddDialogModalities';
import EditDialogModalities from './EditDialogModalities';


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




export default function TableModalities({title, data}) {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dialogEditOpen, setDialogEditOpen] = useState(false);
  const [dialogAddOpen, setDialogAddOpen] = useState(false);

  const deleteModalities = async () => {
    try {
      console.log(selectedId.modality_id)
      // Hacer la solicitud de eliminación al servidor utilizando selectedDriverId
      const response = await fetch(`http://localhost:8000/modalities/delete/${selectedId.modality_id}`, {
        method: 'DELETE',
      });
      // Manejar la respuesta del servidor (puedes mostrar un mensaje de éxito, actualizar la lista, etc.)
      if (response.ok) {
        console.log('Modalidad eliminada con éxito');
        // Puedes recargar la lista de conductores o realizar otras acciones después de la eliminación
      } else {
        console.error('Error al eliminar la modalidad');
      }
    } catch (error) {
      console.error('Error de red', error);
    } finally {
      handleCloseDialog();
    }
  };

  
  
  //paso 1: copiar desde aca

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

  
    

    function createData(modality_id, descrpt) {
      return {modality_id, descrpt};
    }


    const rows = data.map(modalities => createData(modalities.modality_id,modalities.descrpt));
  

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
            <StyledTableCell>Modalidades</StyledTableCell>
            <StyledTableCell>Descripcion</StyledTableCell>
            <StyledTableCell align="right">Acciones</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.modality_id}>
                <StyledTableCell component="th" scope="row">
                  {row.modality_id}
                </StyledTableCell>
                <StyledTableCell>{row.descrpt}</StyledTableCell>
                <StyledTableCell align="right">{row.acciones}
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
      <DeleteDialog open={dialogOpen} onClose={handleCloseDialog} onDelete={deleteModalities} />
      <EditDialogModalities open={dialogEditOpen} onClose={handleDialogEditClose} data={selectedId} />
      <AddDialogModalities open={dialogAddOpen} onClose={handleDialogAddClose}  />
    </>
  );
  
}
