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
import AddDialogPayments from './AddDialogPayment';

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



export default function TablePayments({title, data}) {

  const deletePayments = async () => {
    try {
      
      const response = await fetch(`http://localhost:8000/payments/delete/${selectedId.payment_id}`, {
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

  
 
function createData(payment_id,payment_date,amount,payment_type,card_number,bank,currency,station_rif,plate) {
    return {payment_id,payment_date,amount,payment_type,card_number,bank,currency,station_rif,plate};
  }
  
  const rows = data.map(Payments=> createData(Payments.payment_id,Payments.payment_date,Payments.amount,Payments.payment_type,Payments.card_number,Payments.bank,Payments.currency,Payments.station_rif,Payments.plate));
  
 
  
    

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
            <StyledTableCell>ID Pago </StyledTableCell>
            <StyledTableCell>Fecha</StyledTableCell>
            <StyledTableCell>Cantidad</StyledTableCell>
            <StyledTableCell>Tipo Pago</StyledTableCell>
            <StyledTableCell>Numero de Tarjeta</StyledTableCell>
            <StyledTableCell>Banco</StyledTableCell>
            <StyledTableCell>Divisa</StyledTableCell>
            <StyledTableCell>Rif Estacion</StyledTableCell>
            <StyledTableCell>placa</StyledTableCell>
            <StyledTableCell align="right">Acciones</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            
    
        {rows.map((row) => (
        <StyledTableRow key={row.payment_id}>
            <StyledTableCell component="th" scope="row">
            {row.payment_id}
            </StyledTableCell>
            <StyledTableCell>{row.payment_date}</StyledTableCell>
            <StyledTableCell>{row.amount}</StyledTableCell>
            <StyledTableCell>{row.payment_type}</StyledTableCell>
            <StyledTableCell>{row.card_number}</StyledTableCell>
            <StyledTableCell>{row.bank }</StyledTableCell>
            <StyledTableCell>{row.currency}</StyledTableCell>
            <StyledTableCell>{row.station_rif}</StyledTableCell>
            <StyledTableCell>{row.plate}</StyledTableCell>
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
      <DeleteDialog open={dialogOpen} onClose={handleCloseDialog}  onDelete={deletePayments}/>
      <EditDialog open={dialogEditOpen} onClose={handleDialogEditClose} title={"Editar "+ title}/>
      <AddDialogPayments open={dialogAddOpen} onClose={handleDialogAddClose} />
    </>
  );
  
}
