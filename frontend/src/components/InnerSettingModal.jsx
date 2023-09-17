import React from "react";
import { Row, Col, Dropdown, Space, Typography, Divider, Card, Switch } from "antd";
import { DownOutlined } from "@ant-design/icons";

const InnerSettingModal = () => {
  const itemsForDarkLightMode = [
    {
      key: "1",
      label: "Light",
    },
    {
      key: "2",
      label: "Dark",
    },
  ];
  const gridStyle = {
    width: '100%',
  };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  
  return (
    <>
      <Card
        title="Appearance"
        extra={
          <Dropdown
            menu={{
              items: itemsForDarkLightMode,
              selectable: true,
              defaultSelectedKeys: ["1"],
            }}
          >
            <Typography.Link>
              <Space>
                Dark
                <DownOutlined />
              </Space>
            </Typography.Link>
          </Dropdown>
        }
      >
        
    <Card.Grid hoverable={false} style={gridStyle}>
        <Row gutter={[16, 16]}>
          <Col span={20}>
            <Typography level={3} style={{fontSize: '17px'}}>Title</Typography>
          </Col>
          <Col span={4}>
            <Typography level={3} style={{ textAlign: 'right', fontSize: '17px' }}>
            <Switch defaultChecked onChange={onChange} />
            </Typography>
          </Col>
          </Row>
    </Card.Grid>
    <Card.Grid hoverable={false} style={gridStyle}>Setting 3</Card.Grid>
      </Card>

      <Divider />
    </>
  );
};

export default InnerSettingModal;
