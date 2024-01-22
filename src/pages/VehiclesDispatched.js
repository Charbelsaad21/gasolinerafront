import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableGasolinaDiaria from "../components/TablePromeStationService"
import TableFinalGasolinaDia from "../components/TableHistorialDespacho"
import TableVehiclesDispatched from "../components/TableVehiclesDispatched"

const VehiclesDispatched = () => {

    return (
        <>
            <ResponsiveDrawer title={"Vehiculos despachados"}/> 
            <TableVehiclesDispatched title={"Vehiculos despachados"} />
        </>
    )
}

export default VehiclesDispatched