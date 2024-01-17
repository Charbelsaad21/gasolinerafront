import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableDrives from "../components/TableDrives";


const Drives= () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://127.0.0.1:8000/Drives');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);

    return (
        <>
            <ResponsiveDrawer title={"Conduce"}/> 
            <TableDrives title={"Conduce"}  data={data} />
            {console.log(data)}
        </>
    )
}

export default Drives