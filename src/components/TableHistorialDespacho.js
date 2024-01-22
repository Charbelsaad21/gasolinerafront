import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

export default function TableHistorialDespacho({ title, data }) {
  return (
    <>
      <TableContainer component={Paper} sx={{ marginLeft: 31, marginTop: 10, maxWidth: 'calc(100% - 250px)' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>RIF de Estacion</StyledTableCell>
              <StyledTableCell>Placa</StyledTableCell>
              <StyledTableCell>Fecha de Despacho</StyledTableCell>
              <StyledTableCell>Litros</StyledTableCell>
              <StyledTableCell>Bs</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((row) => (
              <StyledTableRow key={row.station_rif}>
                <StyledTableCell component="th" scope="row">
                  {row.station_rif}
                </StyledTableCell>
                <StyledTableCell>{row.plate}</StyledTableCell>
                <StyledTableCell>{row.dispatch_date}</StyledTableCell>
                <StyledTableCell>{row.liters}</StyledTableCell>
                <StyledTableCell>{row.Bs}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
