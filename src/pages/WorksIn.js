import { useEffect, useState } from "react";
import { Box, Table } from "@mui/material";
import ResponsiveDrawer from "../components/Menu";
import TableWorksIn from "../components/TableWorksIn";

const WorksInPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://127.0.0.1:8000/WorksIn');
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, []);

  return (
    <>
      <ResponsiveDrawer title={"Trabaja en"} />
      <TableWorksIn title={"Surte"} data={data} />
      {console.log(data)}
    </>
  );
};

export default WorksInPage;
