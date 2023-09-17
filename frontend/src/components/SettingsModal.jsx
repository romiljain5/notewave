import { React, useState } from "react";
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
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import InnerSettingModal from "./InnerSettingModal";

const SettingsModal = ({ isModalOpen, handleCancel, handleOk }) => {
  const [isSettingOpen, setIsSettingOpen] = useState(true);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const items = [
    getItem(
      "Quick Links",
      "grp",
      null,
      [
        getItem("Settings", "1", <SettingOutlined />),
        getItem("My Account", "2", <UserOutlined />),
      ],
      "group"
    ),
    {
      type: "divider",
    },
  ];

  const onClick = (e) => {
    console.log("click ", e);
    switch (e.key) {
      case "1":
        setIsSettingOpen(true);
        setIsAccountOpen(false);
        break;
      case "2":
        setIsSettingOpen(false);
        setIsAccountOpen(true);
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <Modal
        title="Basic Modal"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Row>
          <Col span={7}>
            <Menu
              onClick={onClick}
              style={{
                width: 256,
              }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              items={items}
            />
          </Col>
          <Col span={17}>
            {/* <Col > */}
            {/* Render according to selected item */}
            {isSettingOpen && <InnerSettingModal />}
            {isAccountOpen && <p>Account Page</p>}
            {/* </Col> */}
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default SettingsModal;
