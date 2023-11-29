import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Radio, Space, Divider, Spin } from "antd";
import { TeacherLessonApi } from "../../api";
import { useParams } from "react-router-dom";
import LoadingWrapper from "../utils/LoadingWrapper";

import "quill/dist/quill.snow.css";

import { toastSuccess } from "../../toast";

const LessonEditPage = (props) => {
  const { quill, quillRef } = useQuill({});
  const { lessonId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [lessonName, setLessonName] = useState("");

  function saveDoc() {
    const content = quill.getContents();
    const jsonStringContent = JSON.stringify(content);
    TeacherLessonApi.updateLessonContent(lessonId, jsonStringContent).then(
      (response) => {
        const { messages } = response.data;
        for (const message of messages) {
          toastSuccess(message);
        }
      }
    );
  }

  function loadDoc(doc) {
    if (doc == null || doc.length == 0) return;
    try {
      if (quill != null) {
        const json = JSON.parse(doc);
        quill.setContents(json);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    TeacherLessonApi.getLessonById(lessonId)
      .then((response) => {
        const lessonModel = response.data.data;
        setLessonName(response.data.data.name);
        const { lessonContent } = lessonModel;
        loadDoc(lessonContent);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [quill, quillRef]);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  return (
    <>
      <h1 style={{ margin: "20px" }}>{lessonName}</h1>
      <Spin spinning={isLoading}>
        <div
          style={{ width: "100%", height: "auto" }}
          className="ql-rich-text-editz"
        >
          <div ref={quillRef} />
        </div>
      </Spin>
      <Button
        onClick={saveDoc}
        type="primary"
        size={"large"}
        style={{ margin: "20px 20px" }}
      >
        Lưu lại
      </Button>
    </>
  );
};
export default LessonEditPage;
