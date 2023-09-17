import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  SearchOutlined,
  FileTextOutlined,
  BellOutlined,
  CheckSquareOutlined,
  HeartOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Menu, Modal, Row, Col } from "antd";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
import { useState } from "react";
import SettingsModal from "./SettingsModal";
import TextEditor from "./TextEditor";
import AllNotes from "./AllNotes";
import Tasks from "./Tasks";

const MenuItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEditor, setShowEditor] = useState(true);
  const [showAllNotes, setShowAllNotes] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = [
    getItem(
      "Quick Links",
      "grp",
      null,
      [
        getItem("Search", "13", <SearchOutlined />),
        getItem("Add Note", "14", <PlusOutlined />),
        getItem("All Notes", "15", <FileTextOutlined />),
        getItem("Reminders", "16", <BellOutlined />),
        getItem("Tasks", "17", <CheckSquareOutlined />),
        getItem("Favorites", "18", <HeartOutlined />),
        getItem("Settings", "19", <SettingOutlined />),
      ],
      "group"
    ),
    getItem("Navigation One", "sub1", <MailOutlined />, [
      getItem(
        "Item 1",
        "g1",
        null,
        [getItem("Search", "1"), getItem("Option 2", "2")],
        "group"
      ),
      getItem(
        "Item 2",
        "g2",
        null,
        [getItem("Option 3", "3"), getItem("Option 4", "4")],
        "group"
      ),
    ]),
    getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
      getItem("Option 5", "5"),
      getItem("Option 6", "6"),
      getItem("Submenu", "sub3", null, [
        getItem("Option 7", "7"),
        getItem("Option 8", "8"),
      ]),
    ]),
    {
      type: "divider",
    },
    getItem("Navigation Three", "sub4", <SettingOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ];

  const onClick = (e) => {
    console.log("click ", e);
    switch (e.key) {
      case "19":
        showModal();
        break;
      case "14":
        setShowEditor(true);
        setShowAllNotes(false);
        setShowTasks(false);
        break;
      case "15":
        setShowAllNotes(true);
        setShowEditor(false);
        setShowTasks(false);
        break;
      case "17":
        setShowTasks(true);
        setShowAllNotes(false);
        setShowEditor(false);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Row>
        <Col span={5}>
          <Menu
            onClick={onClick}
            style={{
              width: 256,
            }}
            defaultSelectedKeys={["14"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </Col>
        <Col span={19}>
          <SettingsModal
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
          {showEditor && (
            <>
              <div id="content">
                {/* <p>This is some initial content.</p> */}
              </div>

              <TextEditor />
            </>
          )}
          {showAllNotes && (
            <>
              <AllNotes />
            </>
          )}
          {showTasks && <Tasks/>}
        </Col>
      </Row>
    </div>
  );
};
export default MenuItem;
