import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableMUI from "../components/Table"

const ServiceStations= () => {

    return (
        <>
            <ResponsiveDrawer title={"Estacion de servicio"}/> 
            <TableMUI title={"Estacion de servicio"}/>

        </>
    )
}

export default ServiceStations