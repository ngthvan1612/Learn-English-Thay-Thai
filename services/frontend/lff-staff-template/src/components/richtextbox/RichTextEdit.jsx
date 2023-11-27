import React, { useEffect } from 'react';

import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');

import 'quill/dist/quill.snow.css';

import styles from './quill-rich-text.css'


export default () => {
  const { quill, quillRef } = useQuill({

  });

  function saveDoc() {
    const content = quill.getContents();
    const jsonStringContent = JSON.stringify(content);
    localStorage.setItem("test", jsonStringContent);
  }

  function loadDoc() {
    const test = localStorage.getItem("test");
    const json = JSON.parse(test);
    quill.setContents(json);
  }

  useEffect(() => {
    if (quill != null) {
      quill.clipboard.addMatcher('img', (node, delta) => {
        
        return delta;
      });
    }
  }, [quill]);

  return (
    <>
      <button onClick={saveDoc}>save</button>
      <button onClick={loadDoc}>load</button>
      <h1>Edit</h1>
      <div style={{ width: '100%', height: 'auto' }} className="ql-rich-text-edit">
        <div ref={quillRef} />
      </div>
    </>
  );
};