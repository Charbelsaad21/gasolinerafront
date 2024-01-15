import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableMUI from "../components/Table"

const OwnersPhones= () => {

    return (
        <>
            <ResponsiveDrawer title={"Telefono de Propietario"}/> 
            <TableMUI title={"Telefono de Propietario"}/>

        </>
    )
}

export default OwnersPhones