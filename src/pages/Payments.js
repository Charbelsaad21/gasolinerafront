import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TablePayments from "../components/TablePayments"


const Payments= () => {

     
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8000/Payments');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);

    return (
        <>
            <ResponsiveDrawer title={"Pago"}/> 
            <TablePayments title={"Pago"}  data={data} />
            {console.log(data)}


        </>
    )
}

export default Payments