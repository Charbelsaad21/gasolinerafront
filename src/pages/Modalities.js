import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableModalities from "../components/TableModalities"

const Modalities = () => {

    
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://127.0.0.1:8000/modalities');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);


    return (
        <>
            <ResponsiveDrawer title={"Modalidades"}/> 
            <TableModalities title={"Modalidades"}  data={data} />
            {console.log(data)}

        </>
    )
}

export default Modalities