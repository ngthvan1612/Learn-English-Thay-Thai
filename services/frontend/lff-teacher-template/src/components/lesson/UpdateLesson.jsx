import { Button, Modal, Form, Input, Select, DatePicker } from "antd";

import React, { useEffect, useState, useParams } from "react";
import axios from "axios";
import { TeacherLessonApi, TeacherClassroomApi } from "../../api";
import { toastError, toastSuccess } from "../../toast";

import moment from "moment";

function UpdateLesson(props) {
  const [form] = Form.useForm();
  const [getListClasss, setListClasss] = useState([]);
  const [getClassName, setClassName] = useState([]);
  const updateLesson = (id, lesson) => {
    TeacherLessonApi.updateLesson(id, lesson)
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

  // const refreshListClass = () => {
  //   TeacherClassroomApi.getAllClassrooms()
  //     .then((response) => {
  //       const { data: classs } = response.data;
  //       setListClasss([
  //         ...classs.map((record) => {
  //           return {
  //             value: record.id,
  //             label: record.name,
  //           };
  //         }),
  //       ]);
  //     })
  //     .catch((error) => {});
  // };

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

  useEffect(() => {
    form.setFieldValue("name", props.currentLessonEdit.name);
    form.setFieldValue("description", props.currentLessonEdit.description);
    form.setFieldValue(
      "startTime",
      moment(props.currentLessonEdit.startTime, "DD/MM/YYYY HH:mm:ss")
    );
    form.setFieldValue(
      "endTime",
      moment(props.currentLessonEdit.endTime, "DD/MM/YYYY HH:mm:ss")
    );
    if (props.currentLessonEdit.class)
      form.setFieldValue("classId", props.currentLessonEdit.class.id);
  }, [props.currentLessonEdit]);

  const handleUpdateLesson = () => {
    const lesson = {
      name: form.getFieldValue("name"),
      description: form.getFieldValue("description"),
      startTime: moment(form.getFieldValue("startTime")).utc(true),
      endTime: moment(form.getFieldValue("endTime")).utc(true),
      classId: form.getFieldValue("classId"),
    };
    const id = props.currentLessonEdit.id;
    updateLesson(id, lesson);
  };

  return (
    <>
      <Modal
        title="Cập nhật thông tin buổi học"
        open={props.isEditModalOpen}
        onOk={handleUpdateLesson}
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
            {/* <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Tìm kiếm lớp học"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={getListClasss}
            /> */}
            {getClassName}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UpdateLesson;
