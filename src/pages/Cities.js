import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableMUI from "../components/Table"

const Cities= () => {

    return (
        <>
            <ResponsiveDrawer title={"Ciudades"}/> 
            <TableMUI  title={"Ciudades"}/>

        </>
    )
}

export default Cities