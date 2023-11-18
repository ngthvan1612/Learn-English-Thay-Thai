import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "quill/dist/quill.snow.css";
import { StudentClassroomApi, StudentLessonApi } from "../../api";
import RichTextView from "./editorview/RichTextView";
import RichTextEdit from "./editorview/RichTextEdit";
import LoadingWrapper from "../utils/LoadingWrapper";
import { Card, Descriptions, Spin } from "antd";
import moment from "moment/moment";

export default function LessonViewComponent(props) {
  const { classroomId, lessonId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [lessonInfo, setLessonInfo] = useState({});

  function fetchLessonInfo() {
    setIsLoading(true);
    StudentLessonApi.getLessonById(lessonId)
      .then((response) => {
        const lessonModel = response.data.data;
        setLessonInfo({ ...lessonModel });
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchLessonInfo();
  }, []);

  return (
    <>
        <Spin spinning={isLoading}>
          <Card title={"Bài giảng: " + lessonInfo?.name}>
            <Descriptions
              title="Thông tin bài giảng"
              layout="vertical"
              bordered
            >
              <Descriptions.Item label="Mô tả">
                {lessonInfo?.description}
              </Descriptions.Item>
              <Descriptions.Item label="Tạo lúc">
                {moment(lessonInfo?.createdAt).format("HH:mm - DD/MM/YYYY")}
              </Descriptions.Item>
              <br />
              <Descriptions.Item label="Buổi học bắt đầu lúc">
                {moment(lessonInfo?.startDate).format("HH:mm - DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Buổi học kết thúc lúc">
                {moment(lessonInfo?.endDate).format("HH:mm - DD/MM/YYYY")}
              </Descriptions.Item>
            </Descriptions>
            <RichTextView data={lessonInfo?.lessonContent} />
          </Card>
        </Spin>
    </>
  );
}
