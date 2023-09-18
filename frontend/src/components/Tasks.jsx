import { React, useEffect, useState } from "react";
import { Input, Space, Button, notification } from "antd";
import TasksList from "./TasksList";
import axios from "axios";

const { TextArea, Search } = Input;
const Tasks = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState({});
  const [addTaskLoading, setAddTaskLoading] = useState(false);
  const onSubmit = async (value, _e, info) => {
    console.log(value, description);
    if(title===""){
      openNotificationWithIcon('error', 'Please enter a task', '', 'bottomRight');
      return;
    }
    await addTask();
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description, placement) => {
    api[type]({
      message: message,
      description,
      placement
    });
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

  const addTask = async () => {
    // console.log("updateTask", Task);
    setAddTaskLoading(true);
    try {
      const data = await axios.post(
        `http://localhost:8080/add-task`,
        {
          title: title,
          description: description,
          dueDate: new Date(),
          completed: false,
        },
        {
          params: {
            token: import.meta.env.VITE_REACT_APP_TOKEN,
          },
        }
      );
      openNotificationWithIcon('success', 'Note added successfully', '', 'bottomRight');
    } catch (error) {
      openNotificationWithIcon('error', 'Error occurred', error.message, 'bottomRight');
    }
  };
  
  return (
    <div>
      {contextHolder}
      <>
        <Search
          placeholder="Add a task"
          allowClear
          enterButton="Add Task"
          size="large"
          maxLength={80}
          onSearch={onSubmit}
          onChange={(e) => setTitle(e.target.value)}
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
        <TasksList
          tasksData={data}
          addTaskLoading={addTaskLoading}
          setAddTaskLoading={setAddTaskLoading}
        />
      </div>
    </div>
  );
};

export default Tasks;
