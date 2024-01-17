import { useEffect, useState } from "react"
import { Box, Table } from "@mui/material"
import ResponsiveDrawer from "../components/Menu"
import TableEmployeesPhones from "../components/TableEmployeesPhones"

const EmployeesPhones= () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8000/EmployeesPhones');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);

    return (
        <>
            <ResponsiveDrawer title={"Telefono de Empleados"}/> 
            <TableEmployeesPhones title={"Telefono de Empleados"}  data={data} />
            {console.log(data)}


        </>
    )
}

export default EmployeesPhones