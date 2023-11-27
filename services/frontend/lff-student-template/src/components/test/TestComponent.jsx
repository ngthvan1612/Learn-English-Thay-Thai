import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import TestContainer from "../question-component/TestContainer";
import {
  TEST_MODE_EXAM,
  TEST_MODE_RESULT,
  TEST_MODE_REVIEW,
} from "../question-component/type";
import { useNavigate, useParams } from "react-router-dom";
import { StudentStudentTestApi, StudentStudentTestResultApi } from "../../api";
import {
  processCreateSuccessResponse,
  processErrorResponse,
  toastError,
} from "../../toast";

const MODE_ATTEMPT = "attempt";
const MODE_REVIEW = "review";

export default function TestComponent() {
  const { classroomId, lessonId, studentTestId, mode } = useParams();
  const [questionWithResponses, setQuestionWithResponses] = useState([]);
  const [currentMode, setCurrentMode] = useState(TEST_MODE_EXAM);
  const navigate = useNavigate();

  useEffect(() => {
    if (mode == MODE_ATTEMPT) setCurrentMode(TEST_MODE_EXAM);
    else if (mode == MODE_REVIEW) setCurrentMode(TEST_MODE_RESULT);
    else {
      window.location.href = "/student";
    }
  }, []);

  useEffect(() => {
    StudentStudentTestApi.getAllQuestionByStudentTestId(studentTestId).then(
      (resp) => {
        const rawQuestions = resp.data.data;
        const fixedQuestions = rawQuestions.map((u, order) => {
          return {
            question: {
              ...JSON.parse(u.question.content),
              order: order + 1,
              id: u.question.id,
            },
            selected: u.result,
          };
        });
        if (
          fixedQuestions.some((u) => u.question.answer == null) &&
          mode == MODE_REVIEW
        ) {
          toastError("Bạn không có quyền truy cập vào trang này");
          navigate("/student");
        } else {
          setQuestionWithResponses([...fixedQuestions]);
        }
      }
    );
  }, []);

  function saveAnswer(questionId, selectedItem) {
    StudentStudentTestResultApi.updateAnswerByStudentTestResult(
      studentTestId,
      questionId,
      selectedItem
    )
      .then((resp) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  function submit() {
    StudentStudentTestApi.submitTest(studentTestId)
      .then((response) => {
        processCreateSuccessResponse(response);
        navigate({
          pathname: `/student/classroom/${classroomId}/lesson/${lessonId}/test`,
        });
      })
      .catch((err) => {
        processErrorResponse(err);
      });
  }

  const confirm = () => {
    Modal.confirm({
      title: "Bạn có chắc muốn nộp bài không",
      icon: <ExclamationCircleOutlined />,
      okText: "Ok",
      cancelText: "Hủy",
      onOk: submit,
    });
  };

  return (
    <>
      <div
        style={{
          paddingLeft: "1rem",
          paddingTop: "1rem",
          paddingRight: "0.5rem",
        }}
      >
        <TestContainer
          mode={currentMode}
          numberOfQuestionMarkIconsPerRow={5}
          listQuestionAndAnswer={questionWithResponses}
          onAnswerChanged={(question, answer) => {
            saveAnswer(question.id, answer);
          }}
          onSubmit={confirm}
        />
      </div>
    </>
  );
}
