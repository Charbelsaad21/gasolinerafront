import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableOwnersPhones from "../components/TableOwnersPhones"

const OwnersPhones= () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8000/OwnersPhones');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);

    return (
        <>
            <ResponsiveDrawer title={"Telefono de Propietario"}/> 
            <TableOwnersPhones title={"Telefono de Propietario"}  data={data} />
            {console.log(data)}


        </>
    )
}

export default OwnersPhones