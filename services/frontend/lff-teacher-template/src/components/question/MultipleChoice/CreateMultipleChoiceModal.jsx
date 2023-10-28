import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useEffect } from "react";
import { QUESTION_TYPE_MULTIPLE_CHOICE } from "../type";
const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 24 - 2,
  },
};

export default function CreateMultipleChoiceModal(props) {
  const [responseForm] = useForm();

  function onSubmit() {
    const responses = responseForm.getFieldValue("responses");
    if (typeof props?.onAfterCreated === "function") {
      props.onAfterCreated(multipleChoiceData);
    }
  }

  function updateListSelection() {
    setListAnswerSelections(
      responseForm.getFieldValue("responses").map((resp, index) => {
        const key = String.fromCharCode(index + 65);
        return {
          label: `${key}. ${resp}`,
          value: key,
        };
      })
    );
    setMultipleChoiceData({
      ...multipleChoiceData,
      choices: responseForm.getFieldValue("responses").map((resp, index) => {
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

  const [listAnswerSelections, setListAnswerSelections] = useState([]);

  return (
    <Modal
      title="Thêm câu hỏi mới"
      open={props.isOpen}
      onOk={onSubmit}
      onCancel={() => props.setModalOpen(false)}
    >
      <Form>
        <Form.Item label="Nội dung câu hỏi">
          <Input.TextArea
            onChange={(e) => updateQuestionTitle(e.target.value)}
          />
        </Form.Item>
      </Form>
      <Form
        form={responseForm}
        {...formItemLayout}
        style={{
          width: "100%",
          marginBottom: 0,
        }}
      >
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
      </Form>
      <Form>
        <Form.Item label="Đáp án">
          <Select
            options={listAnswerSelections}
            onChange={(value) => updateAnswer(value)}
          ></Select>
        </Form.Item>
        <Form.Item label="Lời giải">
          <Input.TextArea
            rows={5}
            onChange={(e) => updateSolution(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
