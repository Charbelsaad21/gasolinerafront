import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableMUI from "../components/Table"

const Supplies= () => {

    return (
        <>
            <ResponsiveDrawer title={"Suministros"}/> 
            <TableMUI title={"Suministros"}/>

        </>
    )
}

export default Supplies