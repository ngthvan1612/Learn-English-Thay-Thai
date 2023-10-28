import { Button, Modal, Form, Input, Select, DatePicker } from "antd";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { TeacherTestApi, TeacherLessonApi } from "../../api";
import { toastError, toastSuccess } from "../../toast";

import moment from "moment";

function UpdateTest(props) {
  const [form] = Form.useForm();
  const [getListLessons, setListLessons] = useState([]);

  const updateTest = (id, test) => {
    TeacherTestApi.updateTest(id, test)
      .then((response) => {
        const { messages } = response.data;
        for (const message of messages) {
          toastSuccess(message);
        }
        props.setEditModalOpen(false);
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

  useEffect(() => {
    form.setFieldValue("name", props.currentTestEdit.name);
    form.setFieldValue("description", props.currentTestEdit.description);
    form.setFieldValue(
      "startDate",
      moment(props.currentTestEdit.startDate, "DD/MM/YYYY HH:mm:ss")
    );
    form.setFieldValue(
      "endDate",
      moment(props.currentTestEdit.endDate, "DD/MM/YYYY HH:mm:ss")
    );
    form.setFieldValue(
      "numberOfAttempts",
      props.currentTestEdit.numberOfAttempts
    );
    form.setFieldValue("time", props.currentTestEdit.time);
    if (props.currentTestEdit.lesson)
      form.setFieldValue("lessonId", props.currentTestEdit.lesson.id);
  }, [props.currentTestEdit]);

  const handleUpdateTest = () => {
    const test = {
      name: form.getFieldValue("name"),
      description: form.getFieldValue("description"),
      startDate: moment(form.getFieldValue("startDate")).utc(true),
      endDate: moment(form.getFieldValue("endDate")).utc(true),
      numberOfAttempts: parseInt(form.getFieldValue("numberOfAttempts")),
      time: parseInt(form.getFieldValue("time")),
      lessonId: form.getFieldValue("lessonId"),
    };
    const id = props.currentTestEdit.id;
    updateTest(id, test);
  };

  return (
    <>
      <Modal
        title="Cập nhật thông tin bài kiểm tra"
        open={props.isEditModalOpen}
        onOk={handleUpdateTest}
        onCancel={() => props.setEditModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
        afterClose={() => form.resetFields()}
      >
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          labelCol={{ span: 5 }}
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

export default UpdateTest;
