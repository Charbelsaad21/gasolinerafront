import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableMUI from "../components/Table"

const GetsDispatched= () => {

    return (
        <>
            <ResponsiveDrawer title={"Despacho"}/> 
            <TableMUI title={"Despacho"}/>

        </>
    )
}

export default GetsDispatched