import React, { useEffect } from "react";

import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css";

import "./quill-rich-text.css";

export default ({ data }) => {
  const { quill, quillRef } = useQuill({
    readOnly: true,
  });

  function loadDoc(doc) {
    const json = JSON.parse(doc);
    if (quill != null) {
      quill.setContents(json);
    }
  }

  useEffect(() => {
    if (data == null || data.length == 0) return;
    loadDoc(data);
  }, [data, quillRef, quill]);

  return (
    <>
      <div style={{ width: "100%" }} className="ql-rich-text-view">
        <div ref={quillRef} style={{ height: 'auto', minHeight: '100vh' }} />
      </div>
    </>
  );
};
