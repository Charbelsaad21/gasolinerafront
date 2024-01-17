import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableRates from "../components/TableRates"

const Rates= () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://127.0.0.1:8000/rates');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);

    return (
        <>
            <ResponsiveDrawer title={"Tasa"}/> 
            <TableRates title={"Tasa"}  data={data} />
            {console.log(data)}


        </>
    )
}

export default Rates