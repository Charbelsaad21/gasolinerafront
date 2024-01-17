import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableDispatched from "../components/TableDispatched";


const GetsDispatched= () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://127.0.0.1:8000/Dispatched');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);


    return (
        <>
            <ResponsiveDrawer title={"Despacho"}/> 
            <TableDispatched title={"Despacho"}  data={data} />
            {console.log(data)}

        </>
    )
}

export default GetsDispatched