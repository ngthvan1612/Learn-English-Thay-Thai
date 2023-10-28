import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useEffect } from "react";
import { QUESTION_TYPE_MULTIPLE_CHOICE } from "./type";
import { TeacherQuestionApi, TeacherTestApi } from "../../api";
import { toastError, toastSuccess } from "../../toast";
import { useParams } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 24 - 2,
  },
};

export default function UpdateQuestionn(props) {
  const [form] = Form.useForm();

  function onSubmit() {
    const responses = form.getFieldValue("responses");
    if (typeof props?.onAfterCreated === "function") {
      props.onAfterCreated(multipleChoiceData);
    }
  }

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
          console.log(error.message);
        }
      });
  };

  function updateListSelection() {
    setListAnswerSelections(
      form.getFieldValue("responses").map((resp, index) => {
        const key = String.fromCharCode(index + 65);
        return {
          label: `${key}. ${resp}`,
          value: key,
        };
      })
    );
    setMultipleChoiceData({
      ...multipleChoiceData,
      choices: form.getFieldValue("responses").map((resp, index) => {
        const key = String.fromCharCode(index + 65);
        return {
          raw: resp,
          code: key,
        };
      }),
    });
  }

  function updateAnswer(answer) {
    setMultipleChoiceData({
      ...multipleChoiceData,
      answer,
    });
  }

  function updateSolution(solution) {
    const sols = solution.split("\n");
    setMultipleChoiceData({
      ...multipleChoiceData,
      solutions: sols,
    });
  }

  function updateQuestionTitle(title) {
    setMultipleChoiceData({
      ...multipleChoiceData,
      question: {
        ...multipleChoiceData.question,
        raw: title,
      },
    });
  }

  const { testId } = useParams();

  const handleUpdateQuestion = () => {
    const question = {
      content: JSON.stringify(multipleChoiceData),
      questionType: "MULTIPLE-CHOICE",
      testId: testId,
    };
    const id = props.currentQuestionEdit.id;
    updateQuestion(id, question);
  };

  const [multipleChoiceData, setMultipleChoiceData] = useState({
    meta: {
      type: QUESTION_TYPE_MULTIPLE_CHOICE,
    },
    question: {
      raw: "",
    },
    answer: "",
    choices: [],
    solutions: [],
  });

  useEffect(() => {
    try {
      if (props.currentQuestionEdit != null) {
        const json = JSON.parse(props?.currentQuestionEdit?.content);
        setMultipleChoiceData({ ...json });
        form.setFieldValue("question_content", json?.question?.raw);
        form.setFieldValue(
          "responses",
          json.choices.map((u) => u?.raw)
        );
        setListAnswerSelections(
          json?.choices.map((resp, index) => {
            const key = String.fromCharCode(index + 65);
            return {
              label: `${key}. ${resp.raw}`,
              value: key,
            };
          })
        );
        form.setFieldValue("question_answer", json?.answer);
        form.setFieldValue("question_solutions", json?.solutions?.join("\n"));
      }
    } catch (e) {
      console.log(e);
    }
  }, [props.currentQuestionEdit]);

  const [listAnswerSelections, setListAnswerSelections] = useState([]);

  return (
    <Modal
      title="Cập nhật thông tin câu hỏi"
      open={props.isEditModalOpen}
      onOk={handleUpdateQuestion}
      onCancel={() => props.setEditModalOpen(false)}
      okText="Lưu"
      cancelText="Hủy"
      afterClose={() => form.resetFields()}
    >
      <Form form={form}>
        <Form.Item label="Nội dung câu hỏi" name={"question_content"}>
          <Input.TextArea
            onChange={(e) => updateQuestionTitle(e.target.value)}
          />
        </Form.Item>
        <Form.List
          name="responses"
          style={{
            marginBottom: 0,
          }}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={String.fromCharCode(index + 65)}
                  required={false}
                  key={field.key}
                  style={{
                    width: "100%",
                  }}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Câu trả lời không được trống",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="nội dung"
                      style={{
                        width: "calc(100% - 24px - 5px)",
                      }}
                      autoComplete="off"
                      onChange={updateListSelection}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      style={{
                        margin: 0,
                        marginLeft: 5,
                        padding: 0,
                        fontSize: 24,
                        verticalAlign: "middle",
                      }}
                      className="dynamic-delete-button"
                      onClick={() => {
                        remove(field.name);
                        updateListSelection();
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item
                style={{
                  textAlign: "center",
                }}
              >
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                    updateListSelection();
                  }}
                  style={{
                    width: "60%",
                  }}
                  icon={<PlusOutlined />}
                >
                  Thêm câu trả lời
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item label="Đáp án" name={"question_answer"}>
          <Select
            options={listAnswerSelections}
            onChange={(value) => updateAnswer(value)}
          ></Select>
        </Form.Item>
        <Form.Item label="Lời giải" name={"question_solutions"}>
          <Input.TextArea
            rows={5}
            onChange={(e) => updateSolution(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
