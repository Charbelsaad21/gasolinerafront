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
import Cities from '../pages/Cities';
import axios from 'axios';
import AddDialogCities from './AddDialogCities';

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  },
});



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

export default function TableCities({ title, data }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dialogEditOpen, setDialogEditOpen] = useState(false);
  const [dialogAddOpen, setDialogAddOpen] = useState(false);

  const deleteCities = async () => {
    try {
      // Utilizar axios en lugar de fetch
      const response = await axiosInstance.delete(`http://localhost:8000/cities/delete/${selectedId}`);

      if (response.status === 200) {
        console.log('Ciudad eliminada con éxito');
      } else {
        console.error('Error al eliminar la ciudad');
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

  const handleDialogEditOpen = () => {
    setDialogEditOpen(true);
  };

  const handleDialogEditClose = () => {
    setDialogEditOpen(false);
  };

  const handleDialogAddOpen = () => {
    setDialogAddOpen(true);
  };

  const handleDialogAddClose = () => {
    setDialogAddOpen(false);
  };


  function createData(city_id, city_name, state_id) {
    return { city_id, city_name, state_id };
  }

  const rows = data.map(Cities => createData(Cities.city_id, Cities.city_name, Cities.state_id));

  return (
    <>
      <TableContainer component={Paper} sx={{ marginLeft: 31, marginTop: 10, maxWidth: 'calc(100% - 250px)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: "#6A041D" }}>
          <IconButton aria-label="add" color="#FFF" onClick={handleDialogAddOpen}>
            <AddIcon sx={{ color: "#FFF" }} />
          </IconButton>
        </div>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID Ciudad</StyledTableCell>
              <StyledTableCell>Nombre de la Ciudad</StyledTableCell>
              <StyledTableCell>Id del Estado</StyledTableCell>
              <StyledTableCell align="right">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.city_id}>
                <StyledTableCell component="th" scope="row">
                  {row.city_id}
                </StyledTableCell>
                <StyledTableCell>{row.city_name}</StyledTableCell>
                <StyledTableCell>{row.state_id}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.acciones}
                  <React.Fragment>
                    <IconButton aria-label="edit" color="#000" onClick={handleDialogEditOpen}>
                      <EditIcon />
                    </IconButton>
                  </React.Fragment>
                  <React.Fragment>
                    <IconButton aria-label="delete" color="#000" onClick={() => handleOpenDialog(row.city_id)}>
                      <DeleteIcon />
                    </IconButton>
                  </React.Fragment>
                </StyledTableCell>
              </StyledTableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
      <DeleteDialog open={dialogOpen} onClose={handleCloseDialog} onDelete={deleteCities} />
      <EditDialog open={dialogEditOpen} onClose={handleDialogEditClose} title={"Editar " + title} />
      <AddDialogCities open={dialogAddOpen} onClose={handleDialogAddClose} />
    </>
  );
}