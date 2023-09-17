import { React, useEffect, useState } from "react";
import { Input, Space, Button } from "antd";
import TasksList from "./TasksList";
import axios from "axios";

const { TextArea, Search } = Input;
const Tasks = () => {
  const [description, setDescription] = useState("");
  const [data, setData] = useState({})
  const onSubmit = (value, _e, info) => {
    console.log(value, description);
  };

//   useEffect(() => {
//     const callAPI = async () => {
//         try {
//           const response = await axios.get(`http://localhost:8080/get-all-tasks?token=${import.meta.env.VITE_REACT_APP_TOKEN}`);
//           setData(response.data);
//         //   console.log(response);
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       callAPI();
//   }, [])
  

  return (
    <div>
      <>
        <Search
          placeholder="Add a task"
          allowClear
          enterButton="Add Task"
          size="large"
          maxLength={80}
          onSearch={onSubmit}
          style={{ margin: "10px 0" }}
        />

        <TextArea
          rows={3}
          size="large"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Enter task description"
        />
      </>
      <div style={{ margin: "10px 0" }}>
        <TasksList tasksData={data}/>
      </div>
    </div>
  );
};

export default Tasks;
