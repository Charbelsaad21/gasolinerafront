import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableModels from "../components/TableModels"


const Models= () => {

    
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://127.0.0.1:8000/models');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);


    return (
        <>
            <ResponsiveDrawer title={"Modelo"}/> 
            <TableModels title={"Modelo"}  data={data} />
            {console.log(data)}

        </>
    )
}

export default Models