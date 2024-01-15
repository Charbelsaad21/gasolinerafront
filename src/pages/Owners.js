import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableMUI from "../components/Table"

const owners= () => {

    return (
        <>
            <ResponsiveDrawer title={"Propietario"}/> 
            <TableMUI title={"Propietario"}/>

        </>
    )
}

export default owners