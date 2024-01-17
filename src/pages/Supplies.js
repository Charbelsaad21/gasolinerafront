import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableSupplies from "../components/TableSupplies"

const Supplies= () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://127.0.0.1:8000/Supplies');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);


    return (
        <>
            <ResponsiveDrawer title={"Suministra"}/> 
            <TableSupplies title={"Suministra"}  data={data} />
            {console.log(data)}

        </>
    )
}

export default Supplies