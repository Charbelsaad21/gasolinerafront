import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableMUI from "../components/Table"

const Vehicles= () => {

    return (
        <>
            <ResponsiveDrawer title={"Vehiculos"}/> 
            <TableMUI/>

        </>
    )
}

export default Vehicles