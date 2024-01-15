import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableMUI from "../components/Table"

const worksIn= () => {

    return (
        <>
            <ResponsiveDrawer title={"Trabaja en"}/> 
            <TableMUI title={"Trabaja en"}/>

        </>
    )
}

export default worksIn