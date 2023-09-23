import React, { useCallback, useState, useEffect } from "react";
import { WysiwygEditor } from "@remirror/react-editors/wysiwyg";
import { OnChangeJSON } from "@remirror/react";
import axios from "axios";
import { Button, Input, Row, Col } from "antd";
import { useSelector } from "react-redux";
import {emojiOptions} from "./EditorUnit";
import { updateNote, getNote } from "./EditorUnit";

const STORAGE_KEY = "remirror-editor-content";

const getLatestNote = async (currentNoteId) => {
    const noteData = await getNote(currentNoteId);
    return JSON.stringify(noteData.data.content);
};

const updateNoteObject = async (id, title, emoji) => {
  const updateObject = {
    content: JSON.stringify(localStorage.getItem(STORAGE_KEY)),
    title: title,
    emoji: emoji
  }
  await updateNote(id, updateObject);
  
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
      const content = await getLatestNote(currentNoteId);
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
            <Row className="custom-dropdown" style={{height: "150px", width:"400px", overflow: 'scroll'}}>
              {emojiOptions.map((option) => (
                <Col
                  key={option.key}
                  className="emoji-option"
                  onClick={() => handleSelect(option.emoji)}
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

      <MyEditor onChange={handleEditorChange} initialContent={initialContent} />
      <Button
        type="primary"
        size="large"
        onClick={() => {
          updateNoteObject(currentNoteId, title, selectedEmoji);
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
