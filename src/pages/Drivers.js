import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableDrivers from "../components/TableDrivers"

const Drivers = () => {


    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://127.0.0.1:8000/drivers');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);

    return (
        <>
            <ResponsiveDrawer title={"Conductores"}/> 
            <TableDrivers title={"Conductores"}  data={data} />
            {console.log(data)}
        </>
    )
}

export default Drivers