//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from "../../axios";

//CREATE
const createQuestion = async (question) =>
  await sendPost("teacher/question", question);

const createQuestionByTestId = async (lessonId, testId, question) =>
  await sendPost(`teacher/lesson/${lessonId}/${testId}/question`, question);

//READ
const getAllQuestions = async () => await sendGet("teacher/question");

const getAllQuestionsByTestId = async (testId) => {
  return await sendGet(`teacher/question`, {
    params: {
      "test_id.equal": testId,
    },
  });
};

const getQuestionById = async (questionId) => {
  return await sendGet(`teacher/question`, {
    params: {
      "question_id.equal": questionId,
    },
  });
};

//UPDATE
const updateQuestion = async (id, question) =>
  await sendPut(`teacher/question/${id}`, question);

//DELETE
const deleteQuestionById = async (id) =>
  await sendDelete(`teacher/question/${id}`);

export {
  createQuestion,
  deleteQuestionById,
  getAllQuestions,
  updateQuestion,
  getAllQuestionsByTestId,
  createQuestionByTestId,
};
