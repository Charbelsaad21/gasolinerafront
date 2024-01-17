import { Box, Table } from "@mui/material";
import { useEffect, useState } from "react";
import ResponsiveDrawer from "../components/Menu";
import TableApplies from "../components/TableApplies";


const Applies = () => {


    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://127.0.0.1:8000/Applies');
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);

  return (
    <>
            <ResponsiveDrawer title={"Aplica"}/> 
            <TableApplies title={"Aplica"}  data={data} />
            {console.log(data)}
    </>
  );
};

export default Applies;
