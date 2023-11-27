import React, { useEffect, useState } from 'react';

import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');

import 'quill/dist/quill.snow.css';

import styles from './quill-rich-text.css'

export default (props) => {
  const { quill, quillRef } = useQuill({
    readOnly: true,
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
    if (props.content != '' && props.content != null && quill != null) {
      const json = JSON.parse(props.content);
      quill.setContents(json);
    }
  }, [quill, quillRef, props, props.content])

  return (
    <>
      <div style={{ height: 'auto' }} className="ql-rich-text-view">
        <div ref={quillRef} />
      </div>
    </>
  );
};