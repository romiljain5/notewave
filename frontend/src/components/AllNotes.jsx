import { React, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";

const AllNotes = () => {
  const [data, setData] = useState(false);

  const fetchData = async () => {
    console.log("Fetching data...");
    try {
      const response = await axios.get("http://localhost:8080/thought");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getData=()=>{
    fetchData();
  }

  useEffect(() => {
    const callAPI = async () => {
      try {
        const response = await axios.get("http://localhost:8080/thought");
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    callAPI();
  }, []);

  return (
    <div>
      All Notes Should Render here from MongoDB
      <br />
      {/* <Button onClick={getData}>Fetch</Button> */}
      {data && data}
    </div>
  );
};

export default AllNotes;
