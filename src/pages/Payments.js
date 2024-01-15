import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableMUI from "../components/Table"

const Payments= () => {

    return (
        <>
            <ResponsiveDrawer title={"Pago"}/> 
            <TableMUI title={"Pago"}/>

        </>
    )
}

export default Payments