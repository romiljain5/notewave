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
} from "antd";
import { DeleteOutlined, EditFilled, CheckOutlined } from "@ant-design/icons";
import axios from "axios";

const TasksList = ({ addTaskLoading, setAddTaskLoading }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataForModal, setDataForModal] = useState({
    id: "",
    title: "",
    description: "",
  });

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (item) => {
    setDataForModal({
      id: item._id,
      title: item.title,
      description: item.description,
    });
    setIsModalOpen(true);
  };

  const handleOk = () => {
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

  //   fetch(`http://localhost:8080/get-all-tasks?token=${import.meta.env.VITE_REACT_APP_TOKEN}`)
  //     .then((res) => res.json())
  //     .then((body) => {
  //       setData([...data, ...body.results]);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     });

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

  useEffect(() => {
    loadMoreData();
    console.log("Fetched data", data);
  }, []);
  return (
    <>
      {contextHolder}

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{dataForModal.title!=="" && dataForModal.title}</p>
        <p>{dataForModal.description!=="" && dataForModal.description}</p>
        <p>Some contents...</p>
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
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.description}>
                <List.Item.Meta
                  //   avatar={<Avatar src={item.picture.large} />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={item.description}
                />
                <div>
                  {/* when checked move to done state, when delete delete from db */}
                  <Button
                    type="primary"
                    style={{ backgroundColor: "#52c41a" }}
                    icon={<CheckOutlined />}
                    size={"large"}
                  />
                  <Button
                    type="primary"
                    style={{ margin: "0 10px" }}
                    icon={<EditFilled />}
                    size={"large"}
                    onClick={(e) => showModal(item)}
                  />
                  <Button
                    onClick={(e) => deleteTask(e, item)}
                    type="primary"
                    icon={<DeleteOutlined />}
                    size={"large"}
                    danger
                  />
                </div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};
export default TasksList;
