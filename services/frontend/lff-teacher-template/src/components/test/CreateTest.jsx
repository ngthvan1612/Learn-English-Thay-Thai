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
import { TeacherTestApi, TeacherLessonApi } from "../../api";
import { toastError, toastSuccess } from "../../toast";

import moment from "moment";

function CreateTest(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [getListLessons, setListLessons] = useState([]);
  const createTest = (test) => {
    TeacherTestApi.createTest(test)
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

  const refreshListLesson = () => {
    TeacherLessonApi.getAllLessons()
      .then((response) => {
        const { data: lessons } = response.data;
        setListLessons([
          ...lessons.map((record) => {
            return {
              value: record.id,
              label: record.name,
            };
          }),
        ]);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    refreshListLesson();
  }, []);

  const handleCreateTest = () => {
    const test = {
      name: form.getFieldValue("name"),
      description: form.getFieldValue("description"),
      startDate: moment(form.getFieldValue("startDate")).utc(true),
      endDate: moment(form.getFieldValue("endDate")).utc(true),
      numberOfAttempts: parseInt(form.getFieldValue("numberOfAttempts")),
      time: parseInt(form.getFieldValue("time")),
      lessonId: props.lessonId,
    };
    createTest(test);
  };

  return (
    <>
      <Button
        shape="round"
        type="primary"
        onClick={() => setModalOpen(true)}
        style={{ marginBottom: "16px" }}
      >
        Thêm bài kiểm tra mới
      </Button>
      <Modal
        title="Thêm bài kiểm tra mới"
        open={isModalOpen}
        onOk={handleCreateTest}
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
          <Form.Item label="Tên bài kiểm tra" name="name">
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={10} />
          </Form.Item>
          <Form.Item label="Tg bắt đầu" name="startDate">
            <DatePicker
              autoFocus={true}
              style={{ width: "100%" }}
              format="DD/MM/YYYY HH:mm:ss"
              showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            />
          </Form.Item>
          <Form.Item label="Tg kết thúc" name="endDate">
            <DatePicker
              autoFocus={true}
              style={{ width: "100%" }}
              format="DD/MM/YYYY HH:mm:ss"
              showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            />
          </Form.Item>
          <Form.Item label="Số lần thực hiện tối đa" name="numberOfAttempts">
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item label="Thời gian làm bài" name="time">
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item label="Buổi học" name="lessonId">
            {/* <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Tìm kiếm buổi học"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={getListLessons}
            /> */}
            {props.lessonName}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateTest;
