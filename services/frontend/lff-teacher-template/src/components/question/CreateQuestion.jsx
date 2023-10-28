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
import { TeacherQuestionApi, TeacherTestApi } from "../../api";
import { toastError, toastSuccess } from "../../toast";

import moment from "moment";

function CreateQuestion(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [getListTests, setListTests] = useState([]);

  const createQuestion = (question) => {
    TeacherQuestionApi.createQuestion(question)
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

  const handleCreateQuestion = () => {
    const question = {
      content: form.getFieldValue("content"),
      questionType: form.getFieldValue("questionType"),
      testId: form.getFieldValue("testId"),
    };
    createQuestion(question);
  };

  return (
    <>
      <Button
        shape="round"
        type="primary"
        onClick={() => setModalOpen(true)}
        style={{ marginBottom: "16px" }}
      >
        Thêm câu hỏi mới
      </Button>
      <Modal
        title="Thêm câu hỏi mới"
        open={isModalOpen}
        onOk={handleCreateQuestion}
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

export default CreateQuestion;
