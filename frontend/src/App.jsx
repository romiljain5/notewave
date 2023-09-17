import { useState, useEffect } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Radio, Space, Divider, Row, Col } from "antd";
import TextEditor from "./components/TextEditor";
import MenuItem from "./components/MenuItem";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [size, setSize] = useState("large"); // default is 'middle'

  return (
    <>
      <MenuItem />
    </>
  );
}

export default App;
