import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableCities from "../components/TableCities"

const Cities= () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://127.0.0.1:8000/cities');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);


    return (
        <>
            <ResponsiveDrawer title={"Ciudades"}/> 
            <TableCities title={"Ciudades"}  data={data} />
            {console.log(data)}

        </>
    )
}

export default Cities;
