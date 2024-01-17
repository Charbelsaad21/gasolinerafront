import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableTankerTrucks from "../components/TableTankerTrucks"

const TankerTrucks = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8000/tanker-trucks');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);

    return (
        <>
            <ResponsiveDrawer title={"Camion de Cisterna"}/> 
            <TableTankerTrucks title={"Camion de Cisterna"}  data={data} />
            {console.log(data)}

        </>
    )
}

export default TankerTrucks