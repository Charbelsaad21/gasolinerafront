import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableCarrosGasolinaXSemana from "../components/TableHistoricoSurte"
import TableHistoricoSurte from "../components/TableHistoricoSurte"

const HistoricoSurte = () => {


    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://127.0.0.1:8000/historic-supplies');
            const json = await response.json();
            setData(json);
            console.log(json)
        }
        fetchData();
    }, []);

    return (
        <>
            <ResponsiveDrawer title={"Historico Surte"}/> 
            <TableHistoricoSurte title={"Historico Surte "}  data={data} />
            {console.log(data)}
        </>
    )
}

export default HistoricoSurte