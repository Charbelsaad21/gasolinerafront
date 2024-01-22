import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6A041D",
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

export default function TableVehiclesDispatched({ title }) {
  const [cityId, setCityId] = useState('');
  const [stateId, setStateId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tableData, setTableData] = useState([]);

  const handleConsult = async () => {
    try {
      // Validar que todos los valores estén presentes
      if (!cityId || !stateId || !startDate || !endDate) {
        console.error('Todos los valores son requeridos');
        return;
      }

      console.log(cityId, stateId, startDate, endDate)

      // Realizar la consulta a la API con los valores ingresados
      const response = await fetch(`http://127.0.0.1:8000/Vehicles/dispatch/${stateId}/${cityId}/${startDate}/${endDate}`);
      const data = await response.json();

      if (response.ok) {
        setTableData(data);
        console.log(data)
      } else {
        console.error('Error en la consulta:', data);
      }
    } catch (error) {
      console.error('Error de red', error);
    }
  };

  return (
    <>
      <div style={{ marginLeft: 50, marginTop: 90, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <TextField
          label="City ID"
          type="number"
          value={cityId}
          onChange={(e) => setCityId(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="State ID"
          type="number"
          value={stateId}
          onChange={(e) => setStateId(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained"  onClick={handleConsult} style={{ marginTop: 10, backgroundColor:'#F29E38' }}>
          Consultar
        </Button>
      </div>

      <TableContainer component={Paper} sx={{ marginLeft: 31, marginTop: 10, maxWidth: 'calc(100% - 250px)' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>RIF de la estacion</StyledTableCell>
                <StyledTableCell>Tipo de vehiculo</StyledTableCell>
                <StyledTableCell>Cantidad</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {tableData.map((row, index) => (
                <StyledTableRow key={index}>
                <StyledTableCell>{row.station_rif}</StyledTableCell>
                <StyledTableCell>{row.type_vehicle}</StyledTableCell>
                <StyledTableCell>{row.quantity}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
