import { React, useEffect, useState } from "react";
import {
  Input,
  Space,
  Button,
  Typography,
  notification,
  DatePicker,
  Row,
  Col,
} from "antd";
import TasksList from "./TasksList";
import axios from "axios";

const { TextArea, Search } = Input;
const { Title } = Typography;
const Tasks = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("")
  const [data, setData] = useState({});
  const [addTaskLoading, setAddTaskLoading] = useState(false);
  const onSubmit = async (value, _e, info) => {
    console.log(value, description);
    if (title === "") {
      openNotificationWithIcon(
        "error",
        "Please enter a task",
        "",
        "bottomRight"
      );
      return;
    }
    await addTask();
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(dateString);
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description, placement) => {
    api[type]({
      message: message,
      description,
      placement,
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
          dueDate: date,
          completed: false,
        },
        {
          params: {
            token: import.meta.env.VITE_REACT_APP_TOKEN,
          },
        }
      );
      openNotificationWithIcon(
        "success",
        "Note added successfully",
        "",
        "bottomRight"
      );
      setTitle("");
      setDescription("");
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error occurred",
        error.message,
        "bottomRight"
      );
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

        <Row>
          <Col span={2}>
            <Title level={4} style={{margin:"20px 10px 20px 0"}}>Due date</Title>
          </Col>
          <Col span={21} style={{ float: "left" }}>
            <DatePicker
              size="large"
              onChange={onChange}
              style={{ margin: "10px 0", width:"30%" }}
            />
          </Col>
        </Row>
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
