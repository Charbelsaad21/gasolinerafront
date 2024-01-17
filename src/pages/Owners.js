import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableOwners from  "../components/TableOwners"

const Owners= () => {

    
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8000/owners');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);


    return (
        <>
            <ResponsiveDrawer title={"Propietario"}/> 
            <TableOwners title={"Propietario"}  data={data} />
            {console.log(data)}

        </>
    )
}

export default Owners