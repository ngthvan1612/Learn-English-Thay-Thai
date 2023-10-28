import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
} from "antd";

import React, { useState, useEffect } from "react";
import { TeacherLessonApi, TeacherClassroomApi } from "../../api";
import { toastError, toastSuccess } from "../../toast";

import moment from "moment";

function CreateLesson(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [getListClasss, setListClasss] = useState([]);
  const [getClassName, setClassName] = useState([]);

  const createLesson = (lesson) => {
    TeacherLessonApi.createLesson(lesson)
      .then((response) => {
        const { messages } = response.data;
        for (const message of messages) {
          toastSuccess(message);
        }
        setModalOpen(false);
        props.onClose();
      })
      .catch((error) => {
        const { messages } = error.response.data;
        for (const message of messages) {
          toastError(message);
        }
      });
  };

  const refreshListClass = () => {
    TeacherClassroomApi.getAllClassrooms()
      .then((response) => {
        const { data: classs } = response.data;
        setListClasss([
          ...classs.map((record) => {
            return {
              value: record.id,
              label: record.name,
            };
          }),
        ]);
      })
      .catch((error) => {});
  };

  const getClassNameApi = () => {
    TeacherClassroomApi.getClassRoomById(props.classId)
      .then((response) => {
        setClassName(response.data.data.name);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getClassNameApi();
  }, []);

  const handleCreateLesson = () => {
    const lesson = {
      name: form.getFieldValue("name"),
      description: form.getFieldValue("description"),
      startTime: moment(form.getFieldValue("startTime")).utc(true),
      endTime: moment(form.getFieldValue("endTime")).utc(true),
      classId: props.classId,
    };
    createLesson(lesson);
  };

  return (
    <>
      <Button
        shape="round"
        type="primary"
        onClick={() => setModalOpen(true)}
        style={{ marginBottom: "16px" }}
      >
        Thêm buổi học mới
      </Button>
      <Modal
        title="Thêm buổi học mới"
        open={isModalOpen}
        onOk={handleCreateLesson}
        onCancel={() => setModalOpen(false)}
        okText="Tạo"
        cancelText="Hủy"
        afterClose={() => form.resetFields()}
      >
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          labelCol={{ span: 6 }}
        >
          <Form.Item label="Tên buổi học" name="name">
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={10} />
          </Form.Item>
          <Form.Item label="Thời gian bắt đầu" name="startTime">
            <DatePicker
              autoFocus={true}
              style={{ width: "100%" }}
              format="DD/MM/YYYY HH:mm:ss"
              showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            />
          </Form.Item>
          <Form.Item label="Thời gian kết thúc" name="endTime">
            <DatePicker
              autoFocus={true}
              style={{ width: "100%" }}
              format="DD/MM/YYYY HH:mm:ss"
              showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            />
          </Form.Item>
          <Form.Item label="Lớp học" name="classId">
            {getClassName}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateLesson;
