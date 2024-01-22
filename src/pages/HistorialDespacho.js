import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableHistorialDespacho from "../components/TableHistorialDespacho"


const HistorialDespacho = () => {


    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://127.0.0.1:8000/historic-dispatched');
            const json = await response.json();
            setData(json);
            console.log(json)
        }
        fetchData();
    }, []);

    return (
        <>
            <ResponsiveDrawer title={"Historial de Despacho"}/> 
            <TableHistorialDespacho title={"Historial de Despacho"}  data={data} />
            {console.log(data)}
        </>
    )
}

export default HistorialDespacho