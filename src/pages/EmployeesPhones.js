import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableMUI from "../components/Table"

const EmployeesPhones= () => {

    return (
        <>
            <ResponsiveDrawer title={"Telefono de Empleados"}/> 
            <TableMUI title={"Telefono de Empleados"}/>

        </>
    )
}

export default EmployeesPhones