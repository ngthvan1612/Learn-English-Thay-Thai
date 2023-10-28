import { Button, Modal, Form, Input, Select, DatePicker } from "antd";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { TeacherQuestionApi, TeacherTestApi } from "../../api";
import { toastError, toastSuccess } from "../../toast";

import moment from "moment";

function UpdateQuestion(props) {
  const [form] = Form.useForm();
  const [getListTests, setListTests] = useState([]);

  const updateQuestion = (id, question) => {
    TeacherQuestionApi.updateQuestion(id, question)
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

  const refreshListTest = () => {
    TeacherTestApi.getAllTests()
      .then((response) => {
        const { data: tests } = response.data;
        setListTests([
          ...tests.map((record) => {
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
    refreshListTest();
  }, []);

  useEffect(() => {
    form.setFieldValue("content", props.currentQuestionEdit.content);
    form.setFieldValue("questionType", props.currentQuestionEdit.questionType);
    if (props.currentQuestionEdit.test)
      form.setFieldValue("testId", props.currentQuestionEdit.test.id);
  }, [props.currentQuestionEdit]);

  const handleUpdateQuestion = () => {
    const question = {
      content: form.getFieldValue("content"),
      questionType: form.getFieldValue("questionType"),
      testId: form.getFieldValue("testId"),
    };
    const id = props.currentQuestionEdit.id;
    updateQuestion(id, question);
  };

  return (
    <>
      <Modal
      // title="Cập nhật thông tin câu hỏi"
      // open={props.isEditModalOpen}
      // onOk={handleUpdateQuestion}
      // onCancel={() => props.setEditModalOpen(false)}
      // okText="Lưu"
      // cancelText="Hủy"
      // afterClose={() => form.resetFields()}
      >
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          labelCol={{ span: 5 }}
        >
          <Form.Item label="Nội dung" name="content">
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item label="Loại câu hỏi [const]" name="questionType">
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Tìm kiếm loại câu hỏi [const]"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: "4-CHOICES",
                  label: "4 Phương án chọn 1",
                },
                {
                  value: "MULTI-CHOICES",
                  label: "Chọn nhiều phương án đúng",
                },
                {
                  value: "FILL-IN-BLANK",
                  label: "Điền vào chỗ trống",
                },
                {
                  value: "REPEAT-LISTENING",
                  label: "Nghe và chép lại",
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="Bài kiểm tra" name="testId">
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Tìm kiếm bài kiểm tra"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={getListTests}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UpdateQuestion;
