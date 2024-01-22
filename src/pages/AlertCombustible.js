import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableAlertCombustible from "../components/TableAlertCombustible"


const AlertCombustible = () => {


    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://127.0.0.1:8000/service-stations/alert');
            const json = await response.json();
            setData(json);
            console.log(json)
        }
        fetchData();
    }, []);

    return (
        <>
            <ResponsiveDrawer title={"Alerta de Combustible"}/> 
            <TableAlertCombustible title={"Alerta de Combustible"}  data={data} />
            {console.log(data)}
        </>
    )
}

export default AlertCombustible