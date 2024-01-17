import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableVehicles from "../components/TableVehicles"


const Vehicles= () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://127.0.0.1:8000/Vehicles');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);

    return (
        <>
            <ResponsiveDrawer title={"Vehiculos"}/> 
            <TableVehicles  title={"Vehiculos"}  data={data} />
            {console.log(data)}

        </>
    )
}

export default Vehicles