import React, { useCallback, useState, useEffect } from "react";
import { WysiwygEditor } from "@remirror/react-editors/wysiwyg";
import { OnChangeJSON } from "@remirror/react";
import axios from "axios";
import { Button, Input, Row, Col } from "antd";
import { useSelector } from "react-redux";
import {emojiOptions} from "./EditorUnit";

const STORAGE_KEY = "remirror-editor-content";

const getNote = async (currentNoteId) => {
  try {
    console.log("currentNoteId", currentNoteId);
    const noteData = await axios.get(
      `http://localhost:8080/get-note?token=${
        import.meta.env.VITE_REACT_APP_TOKEN
      }&id=${currentNoteId}`
    );

    console.log(noteData.data);
    return JSON.stringify(noteData.data.content);
  } catch (error) {
    console.log(error);
    return JSON.stringify({ message: error.message });
  }
};

const updateNote = async (id, title, emoji) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/update-note?token=${
        import.meta.env.VITE_REACT_APP_TOKEN
      }&id=${id}`,
      {
        content: JSON.stringify(localStorage.getItem(STORAGE_KEY)),
        title: title,
        emoji: emoji
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const MyEditor = ({ onChange, initialContent }) => {
  return (
    <div style={{ padding: "16px 0" }}>
      <WysiwygEditor
        placeholder="Enter text..."
        initialContent={initialContent}
      >
        <OnChangeJSON onChange={onChange} />
      </WysiwygEditor>
    </div>
  );
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

const TextEditor = () => {
  const [initialContent, setInitialContent] = useState(undefined);

  const currentNoteId = useSelector((state) => state?.notes?.noteId);
  const [title, setTitle] = useState("");

  const [selectedEmoji, setSelectedEmoji] = useState("☘️");
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchData = async () => {
    try {
      const content = await getNote(currentNoteId);
      return content ? JSON.parse(content) : undefined;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData().then((data) => {
      console.log("fetched data", data);
      setInitialContent(data);
    });
  }, [currentNoteId]);

  const handleSelect = (value) => {
    setSelectedEmoji(value);
    setShowDropdown(false);
  };

  // const [initialContent] = useState(() => {
  //   // Retrieve the JSON from localStorage (or undefined if not found)
  //   const content = getNote();
  //   // const content = window.localStorage.getItem(STORAGE_KEY);
  //   return content ? JSON.parse(content) : undefined;
  // });

  const handleEditorChange = useCallback(async (json) => {
    // Store the JSON in localstorage
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
    // setStringContent(JSON.stringify(json));
    // await addNote(JSON.stringify(json));
  }, []);
  return (
    <div style={{ padding: "20px 0" }}>
      <Input
        placeholder="Add fun title"
        size="large"
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
                  <span
                    style={{
                      marginRight: "8px",
                      fontSize: "24px",
                      cursor: "pointer",
                    }}
                  >
                    {option}
                  </span>
                  {/* <span>{option.label}</span> */}
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>

      <MyEditor onChange={handleEditorChange} initialContent={initialContent} />
      <Button
        type="primary"
        size="large"
        onClick={() => {
          updateNote(currentNoteId, title, selectedEmoji);
          // addNote();
          // call update Note here instead
        }}
      >
        Save to DB
      </Button>
    </div>
  );
};

export default TextEditor;
