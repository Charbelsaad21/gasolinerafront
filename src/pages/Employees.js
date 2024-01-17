import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableEmployees from "../components/TableEmployees"


const Employees= () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8000/employee');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);

    return (
        <>
            <ResponsiveDrawer title={"Empleados"}/> 
            <TableEmployees title={"Empleados"}  data={data} />
            {console.log(data)}

        </>
    )
}

export default Employees