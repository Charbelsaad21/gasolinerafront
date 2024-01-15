import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableMUI from "../components/Table"

const Employees= () => {

    return (
        <>
            <ResponsiveDrawer title={"Empleados"}/> 
            <TableMUI  title={"Empleados"}/>

        </>
    )
}

export default Employees