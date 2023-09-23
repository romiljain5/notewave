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
import { emojiOptions, deleteNote, updateNote, getNote } from "./EditorUnit";


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

      setLoading(false);
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
    await getNoteAndUpdateStates(id);
    setOpen(true);
  };

  const deleteNoteAndFetchNote = async (e, note) => {
    const deleteStatus = await deleteNote(note);
    if (deleteStatus.status === "success") {
      fetchData();
    }
  };

  const getNoteAndUpdateStates = async (currentNoteId) => {
    const noteData = await getNote(currentNoteId);

    setIdForModal(currentNoteId);
    console.log(JSON.parse(noteData.data.content));
    // console.log(currentNoteId);
    setInitialContent(JSON.parse(noteData.data.content));
    setTitle(noteData.data.title);
    setSelectedEmoji(noteData.data.emoji);

    window.localStorage.setItem(currentNoteId, noteData.data.content);
    // console.log(content);
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

  const updateNoteObject = async (id) => {
    let updateObject = {
      title: title,
      emoji: selectedEmoji,
    };
    if (contentChangeStatus) {
      updateObject.content = JSON.stringify(localStorage.getItem(id));
    }
    const updateStatus = await updateNote(id, updateObject);

    if (updateStatus.status === "success") {
      fetchData();
    }
  };

  const saveDataAndCloseModal = () => {
    setOpen(false);
    updateNoteObject(idForModal);
  };

  const inputStyle = {
    fontSize: "60px",
    border: "none",
    borderBottom: "0px solid #ccc",
    outline: "none",
    cursor: "pointer",
    margin: "20px 0",
    caretColor: "transparent",
    width: "10%",
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
                    key={option.key}
                    className="emoji-option"
                    onClick={() => handleSelect(option)}
                  >
                    <span
                      style={{
                        marginRight: "8px",
                        fontSize: "24px",
                        cursor: "pointer",
                      }}
                    >
                      {option.emoji}
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
      <Row>
        <Col span={20} style={{margin: '20px 0', fontSize: "20px"}}>All Notes Should Render here from MongoDB</Col>
        <Col span={4} style={{textAlign: "right"}}>
          <Button
            onClick={fetchData}
            type="primary"
            size="large"
            style={{ margin: "16px 0"}}
            loading={loading}
          >
            Refresh
          </Button>
        </Col>
      </Row>
      <br />
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
              <List.Item key={item._id}>
                <List.Item.Meta
                  style={{ fontSize: "40px" }}
                  avatar={item.emoji}
                  title={<a style={{ fontSize: "20px" }}>{item.title}</a>}
                  description={
                    item.content === "" ? "" : JSON.parse(item.content)
                  }
                />
                <div>
                  <Button
                    type="primary"
                    onClick={(e) => modalInstance(e, item._id)}
                    style={{ marginRight: "10px", backgroundColor: "black" }}
                  >
                    Edit
                  </Button>
                  <Button
                    danger
                    onClick={(e) => deleteNoteAndFetchNote(e, item)}
                    style={{ borderColor: "black", color: "black" }}
                  >
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
