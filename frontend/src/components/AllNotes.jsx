import { React, useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import {
  Button,
  Avatar,
  Divider,
  List,
  Skeleton,
  Modal,
  Input,
  AutoComplete,
  Col,
  Row,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { WysiwygEditor } from "@remirror/react-editors/wysiwyg";
import { OnChangeJSON } from "@remirror/react";
import {emojiOptions} from "./EditorUnit";

//use redux to make a variable that sync between MyEditor and AllNotes
// Make sure to use change value of initial content

const AllNotes = () => {
  const [idForModal, setIdForModal] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [contentChangeStatus, setTriggeredContentChange] = useState(false);

  const [initialContent, setInitialContent] = useState("");
  const [editorKey, setEditorKey] = useState(0);

  // const [selectedEmoji, setSelectedEmoji] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("☘️");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (value) => {
    setSelectedEmoji(value);
    setShowDropdown(false);
  };

  useEffect(() => {
    // Whenever idForModal changes, increment the key to trigger a re-render of MyEditor
    setEditorKey((prevKey) => prevKey + 1);
  }, [idForModal]);

  const MyEditor = ({ onChange, initialContent }) => {
    // useEffect(() => {
    console.log("initialContent", initialContent);
    // const editorKey = JSON.stringify(initialContent);
    return (
      <div style={{ padding: "16px 0" }}>
        <WysiwygEditor
          key={editorKey}
          placeholder="Enter text..."
          initialContent={JSON.parse(initialContent)}
          // autoFocus
        >
          <OnChangeJSON onChange={onChange} />
        </WysiwygEditor>
      </div>
    );
    // }, [initialContent]);
  };

  const fetchData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:8080/get-all-notes?token=${
          import.meta.env.VITE_REACT_APP_TOKEN
        }`
      );
      setData(response.data);

      // setData([...response.data]);
      setLoading(false);
      // console.log(JSON.parse(response.data[response.data.length - 1].content));
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const modalInstance = async (e, id) => {
    setTriggeredContentChange(false);
    setIdForModal(id);
    console.log("Current modal instance id", id);
    await getNote(id);
    setOpen(true);
  };

  const deleteNote = async (e, note) => {
    console.log("deleteNote", note);
    try {
      const dataForDeleteNote = await axios.delete(
        `http://localhost:8080/delete-note?token=${
          import.meta.env.VITE_REACT_APP_TOKEN
        }&id=${note._id}`
      );
      console.log(dataForDeleteNote);
      fetchData();
    } catch (error) {
      console.log("deleteTask", error);
    }
  };

  const getNote = async (currentNoteId) => {
    try {
      console.log("currentNoteId", currentNoteId);
      const noteData = await axios.get(
        `http://localhost:8080/get-note?token=${
          import.meta.env.VITE_REACT_APP_TOKEN
        }&id=${currentNoteId}`
      );

      setIdForModal(currentNoteId);
      console.log(JSON.parse(noteData.data.content));
      // console.log(currentNoteId);
      setInitialContent(JSON.parse(noteData.data.content));
      setTitle(noteData.data.title);
      setSelectedEmoji(noteData.data.emoji);

      window.localStorage.setItem(currentNoteId, noteData.data.content);
      // console.log(content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Retrieve the JSON from localStorage when idForModal changes
    try {
      const contentFromLocalStorage = localStorage.getItem(idForModal);
      const parsedContent = contentFromLocalStorage
        ? JSON.parse(contentFromLocalStorage)
        : undefined;

      // Update the initialContent state with the parsed content
      setInitialContent(parsedContent);
    } catch (error) {
      console.error("Error parsing JSON data from local storage:", error);
      setInitialContent(undefined);
    }
  }, [idForModal]);

  const handleEditorChange = useCallback(
    (json) => {
      window.localStorage.setItem(idForModal, JSON.stringify(json));
      setTriggeredContentChange(true);
    },
    [idForModal]
  );

  useEffect(() => {
    fetchData();
  }, []);

  const updateNote = async (id) => {
    try {
      let updateObject = {
        title: title,
        emoji: selectedEmoji
      };
      if (contentChangeStatus) {
        updateObject.content = JSON.stringify(localStorage.getItem(id));
      }
      const response = await axios.put(
        `http://localhost:8080/update-note?token=${
          import.meta.env.VITE_REACT_APP_TOKEN
        }&id=${id}`,
        updateObject,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      fetchData();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveDataAndCloseModal = () => {
    setOpen(false);
    updateNote(idForModal);
  };

  const handleEmojiSelect = (value) => {
    console.log(value);
    setSelectedEmoji(value);
  };

  const inputStyle = {
    fontSize: "60px",
    border: "none",
    borderBottom: "0px solid #ccc",
    outline: "none",
    cursor: "pointer",
    margin: "20px 0",
    caretColor: "transparent",
    width: '10%'
  };
  // rerender myeditor on change of id
  // useEffect(() => {
  //   MyEditor(handleEditorChange, initialContent);
  // }, [idForModal]);

  return (
    <div>
      <Modal
        title={title}
        centered
        open={open}
        onOk={(e) => saveDataAndCloseModal()}
        onCancel={() => setOpen(false)}
        width={"80%"}
      >
        {/* Add editor here */}
        <Input
          placeholder="Add fun title"
          size="large"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div>
          <div style={{ position: "relative" }}>
            <input
              style={inputStyle}
              value={selectedEmoji}
              readOnly
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <Row className="custom-dropdown">
                {emojiOptions.map((option) => (
                  <Col
                    key={option}
                    className="emoji-option"
                    onClick={() => handleSelect(option)}
                  >
                    <span style={{ marginRight: "8px", fontSize: "24px", cursor: 'pointer' }}>
                      {option}
                    </span>
                    {/* <span>{option.label}</span> */}
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </div>

        <MyEditor
          onChange={handleEditorChange}
          initialContent={initialContent}
        />
      </Modal>
      All Notes Should Render here from MongoDB
      <Button onClick={fetchData} type="primary">
        Refresh
      </Button>
      <br />
      {/* <Button onClick={getData}>Fetch</Button> */}
      <div
        id="scrollableDiv"
        style={{
          height: "90vh",
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={fetchData}
          hasMore={data.length < 50}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item._id} >
                <List.Item.Meta
                  style={{fontSize:"40px"}}
                  avatar={item.emoji}
                  title={<a style={{fontSize:'20px'}}>{item.title}</a>}
                  description={JSON.parse(item.content)}
                />
                <div>
                  <Button
                    type="primary"
                    onClick={(e) => modalInstance(e, item._id)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button danger onClick={(e) => deleteNote(e, item)}>
                    Delete
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default AllNotes;
