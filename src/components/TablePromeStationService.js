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

export default function TablePromeStationService({ title }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dialogEditOpen, setDialogEditOpen] = useState(false);
  const [dialogAddOpen, setDialogAddOpen] = useState(false);
  const [start_Date, setStart_Date] = useState('');
  const [end_Date, setEnd_Date] = useState('');
  const [tableData, setTableData] = useState([]);

  const handleDialogAddOpen = () => {
    setDialogAddOpen(true);
  };

  const handleConsult = async () => {
    try {
      // Validar que ambas fechas estén presentes
      if (!start_Date || !end_Date) {
        console.error('Ambas fechas son requeridas');
        return;
      }

      // Realizar la consulta a la API con las fechas
      const response = await fetch(`http://127.0.0.1:8000/service-stations/${start_Date}/${end_Date}`);
      const data = await response.json();

      // Verificar si la respuesta fue exitosa
      if (response.ok) {
        console.log(data)
        setTableData(data);
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
          label="Fecha de Inicio"
          type="date"
          value={start_Date}
          onChange={(e) => setStart_Date(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Fecha Final"
          type="date"
          value={end_Date}
          onChange={(e) => setEnd_Date(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" onClick={handleConsult} style={{ marginTop: 10, backgroundColor:'#F29E38' }}>
          Consultar
        </Button>
      </div>

      <TableContainer component={Paper} sx={{ marginLeft: 31, marginTop: 10, maxWidth: 'calc(100% - 250px)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: "#6A041D" }}>
        </div>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Rif</StyledTableCell>
              <StyledTableCell>Nombre de la Estacion</StyledTableCell>
              <StyledTableCell>Promedio</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {tableData && tableData.map((row) => (
            <StyledTableRow key={row.station_rif}>
              <StyledTableCell component="th" scope="row">
                {row.station_rif}
              </StyledTableCell>
              <StyledTableCell>{row.station_name}</StyledTableCell>
              <StyledTableCell>{row['average_liters']}</StyledTableCell>
            </StyledTableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
