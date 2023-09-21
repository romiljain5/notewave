import React, { useCallback, useState, useEffect } from "react";
import { WysiwygEditor } from "@remirror/react-editors/wysiwyg";
import { OnChangeJSON } from "@remirror/react";
import axios from "axios";
import { Button } from "antd";
import { useSelector } from "react-redux";

const STORAGE_KEY = "remirror-editor-content";

const getNote = async (currentNoteId) => {
  try {
    console.log('currentNoteId', currentNoteId);
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


const updateNote = async (id) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/update-note?token=${
        import.meta.env.VITE_REACT_APP_TOKEN
      }&id=${id}`,
      {
        content: JSON.stringify(localStorage.getItem(STORAGE_KEY)),
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
    <div style={{ padding: 16 }}>
      <WysiwygEditor
        placeholder="Enter text..."
        initialContent={initialContent}
      >
        <OnChangeJSON onChange={onChange} />
      </WysiwygEditor>
    </div>
  );
};

const TextEditor = () => {
  const [initialContent, setInitialContent] = useState(undefined);

  const currentNoteId = useSelector((state) => state?.notes?.noteId);

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
      console.log('fetched data', data)
      setInitialContent(data);
    });
  }, [currentNoteId]);

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
    <>
      <Button
        type="primary"
        size="large"
        onClick={() => {
          updateNote(currentNoteId);
          // addNote();
          // call update Note here instead
        }}
      >
        Save to DB
      </Button>
      <MyEditor onChange={handleEditorChange} initialContent={initialContent} />
    </>
  );
};

export default TextEditor;
