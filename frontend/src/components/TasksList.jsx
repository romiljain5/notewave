import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Avatar,
  Divider,
  List,
  Skeleton,
  Button,
  notification,
  Modal,
  Input,
  Card,
  Row,
  Col,
  Typography,
} from "antd";
import { DeleteOutlined, EditFilled, CheckOutlined, UndoOutlined } from "@ant-design/icons";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;
const { Meta } = Card;
const {Title} = Typography;
const TasksList = ({ addTaskLoading, setAddTaskLoading }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  // const [dataForModal, setDataForModal] = useState({
  //   id: "",
  //   title: "",
  //   description: "",
  // });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (item) => {
    setId(item._id);
    setTitle(item.title);
    setDescription(item.description);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    updateTask();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // notification
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description, placement) => {
    api[type]({
      message: message,
      description,
      placement,
    });
  };

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const tasksData = await axios.get(
        `http://localhost:8080/get-all-tasks?token=${
          import.meta.env.VITE_REACT_APP_TOKEN
        }`
      );
      setData([...tasksData.data]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("addTaskLoading", addTaskLoading);
    if (addTaskLoading) {
      refreshTasks();
    }
    setAddTaskLoading(false);
  }, [addTaskLoading]);

  const refreshTasks = async () => {
    if (loading) return;
    setData([]);
    setLoading(true);
    try {
      const tasksData = await axios.get(
        `http://localhost:8080/get-all-tasks?token=${
          import.meta.env.VITE_REACT_APP_TOKEN
        }`
      );
      console.log(tasksData.data);
      setData([...tasksData.data]);
      setLoading(false);
      console.log("came here", loading);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const markTaskCompleted = async (item) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/update-task?token=${
          import.meta.env.VITE_REACT_APP_TOKEN
        }&id=${item._id}`,
        {
          completed: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      refreshTasks();
      openNotificationWithIcon(
        "success",
        "Task Completed Successfully",
        "",
        "bottomRight"
      );
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error Occured",
        error.message,
        "bottomRight"
      );
    }
  };


  const markTaskUnCompleted = async (item) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/update-task?token=${
          import.meta.env.VITE_REACT_APP_TOKEN
        }&id=${item._id}`,
        {
          completed: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      refreshTasks();
      openNotificationWithIcon(
        "success",
        "Task Rescheduled",
        "",
        "bottomRight"
      );
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error Occured",
        error.message,
        "bottomRight"
      );
    }
  };

  const updateTask = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/update-task?token=${
          import.meta.env.VITE_REACT_APP_TOKEN
        }&id=${id}`,
        {
          title: title,
          description: description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      refreshTasks();
      openNotificationWithIcon(
        "success",
        "Task Updated Successfully",
        "",
        "bottomRight"
      );
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error Occured",
        error.message,
        "bottomRight"
      );
    }
  };

  const deleteTask = async (e, task) => {
    console.log("deleteTask", task);
    try {
      const data = await axios.delete(
        `http://localhost:8080/delete-task?token=${
          import.meta.env.VITE_REACT_APP_TOKEN
        }&id=${task._id}`
      );
      console.log(data);
      refreshTasks();
      openNotificationWithIcon("error", "Deleted task", "", "bottomRight");
    } catch (error) {
      console.log("deleteTask", error);
      openNotificationWithIcon(
        "error",
        "Error occurred while deleting",
        error.message,
        "bottomRight"
      );
    }
  };

  const truncateText=(text, limit)=> {
    if (text && text.length > limit) {
      return text.slice(0, limit) + " ... ";
    }
    return text;
  }

  useEffect(() => {
    loadMoreData();
    console.log("Fetched data", data);
  }, []);
  return (
    <>
      {contextHolder}

      <Modal
        title="Edit Task"
        open={isModalOpen}
        onOk={handleOk}
        okText={"Save"}
        cancelText={"Discard"}
        width={description.length>100?'50%':'30%'}
        cancelButtonProps={{ style: { color: "red", borderColor: "red" } }}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Enter task"
          value={title}
          size="large"
          style={{ margin: "10px 0" }}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextArea
          rows={description.length>100?12:3}
          size="large"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Enter task description"
        />
      </Modal>
      <div
        id="scrollableDiv"
        style={{
          height: "70vh",
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={
            loading && (
              <Skeleton
                avatar
                paragraph={{
                  rows: 6,
                }}
                active
              />
            )
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <Card>
            {data.map((task) => {
              return (
                !task.completed &&
                <Card.Grid
                  style={{
                    width: "40vh",
                    margin: "10px",
                    borderRadius: "10px",
                    // padding: "24px 0 24px 0",
                  }}
                >
                  {/* style={{ textDecoration: "line-through" }} */}

                    <Meta
                      style={{
                        padding: "24px 0",
                        fontSize: "16px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center", // Center horizontally
                        justifyContent: "center", // Center vertically
                        textAlign: "center", // Center text
                      }}
                      // avatar={
                      //   <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                      // }
                      
                      title={truncateText(task.title, 40)}
                      description={truncateText(task.description, 100)}
                    />
                  
                  <Row span={24} style={{ width: "100%" }}>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <Button
                        type="primary"
                        style={{ backgroundColor: "#52c41a" }}
                        icon={<CheckOutlined />}
                        size={"large"}
                        onClick={(e) => markTaskCompleted(task)}
                      />
                    </Col>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <Button
                        type="primary"
                        style={{ margin: "0 10px" }}
                        icon={<EditFilled />}
                        size={"large"}
                        onClick={(e) => showModal(task)}
                      />
                    </Col>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <Button
                        onClick={(e) => deleteTask(e, task)}
                        type="primary"
                        icon={<DeleteOutlined />}
                        size={"large"}
                        danger
                      />
                    </Col>
                  </Row>
                </Card.Grid>
              );
            })}
          </Card>


          <Card>
             <Title level={3} style={{width:'100%', margin:'20px'}}>Completed Tasks</Title> 
            {data.map((task) => {
              return (
                task.completed &&
                <Card.Grid
                  style={{
                    width: "40vh",
                    margin: "10px",
                    borderRadius: "10px",
                    // padding: "24px 0 24px 0",
                  }}
                >
                  {/* style={{ textDecoration: "line-through" }} */}

                  {(
                    <Meta
                      style={{
                        padding: "24px 0",
                        fontSize: "16px",
                        textDecoration: "line-through",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center", // Center horizontally
                        justifyContent: "center", // Center vertically
                        textAlign: "center", // Center text
                      }}
                      // avatar={
                      //   <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                      // }
                      title={truncateText(task.title, 40)}
                      description={truncateText(task.description, 100)}
                    />
                  )
                  }
                  <Row span={24} style={{ width: "100%" }}>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <Button
                        type="primary"
                        icon={<UndoOutlined />}
                        size={"large"}
                        onClick={(e) => markTaskUnCompleted(task)}
                        style={{backgroundColor:'#6C757D'}}
                      />
                    </Col>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <Button
                        type="primary"
                        style={{ margin: "0 10px" }}
                        icon={<EditFilled />}
                        size={"large"}
                        onClick={(e) => showModal(task)}
                      />
                    </Col>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <Button
                        onClick={(e) => deleteTask(e, task)}
                        type="primary"
                        icon={<DeleteOutlined />}
                        size={"large"}
                        danger
                      />
                    </Col>
                  </Row>
                </Card.Grid>
              );
            })}
          </Card>
        </InfiniteScroll>
      </div>
    </>
  );
};
export default TasksList;
