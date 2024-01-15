import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableMUI from "../components/Table"

const TankerTrucks = () => {

    return (
        <>
            <ResponsiveDrawer title={"Camion de Cisterna"}/> 
            <TableMUI title={"Camion de Cisterna"}/>

        </>
    )
}

export default TankerTrucks