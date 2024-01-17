import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableServiceStations from "../components/TableServiceStations"

const ServiceStations= () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://127.0.0.1:8000/service-stations');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);

    return (
        <>
            <ResponsiveDrawer title={"Estacion de servicio"}/> 
            <TableServiceStations title={"Estacion de Servicio"}  data={data} />
            {console.log(data)}

        </>
    )
}

export default ServiceStations