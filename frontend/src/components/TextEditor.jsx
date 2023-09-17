import React from 'react'
import { WysiwygEditor } from '@remirror/react-editors/wysiwyg';

const TextEditor = () => {
  return (
    <div style={{ padding: 16 }}>
      <WysiwygEditor placeholder='Enter text...' />
    </div>
  )
}

export default TextEditor