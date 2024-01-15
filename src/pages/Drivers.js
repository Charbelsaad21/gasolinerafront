import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableMUI from "../components/Table"

const Drivers = () => {

    //endpoint drivers

    return (
        <>
            <ResponsiveDrawer title={"Conductores"}/> 
            <TableMUI title={"Conductores"} />

        </>
    )
}

export default Drivers