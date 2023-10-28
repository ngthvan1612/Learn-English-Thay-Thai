//CRUD-BASE
import { instance, sendDelete, sendGet, sendPost, sendPut } from "../../axios";

//CREATE
const createTest = async (test) => await sendPost("teacher/test", test);

const uploadListQuestionsByTestId = async (testId, formData) =>
  await instance.post(`teacher/test/${testId}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

//READ
const getAllTests = async () => await sendGet("teacher/test");

const getAllTestsByLessonId = async (lessonId) => {
  return await sendGet("teacher/test", {
    params: {
      "lesson_id.equal": lessonId,
    },
  });
};

//UPDATE
const updateTest = async (id, test) =>
  await sendPut(`teacher/test/${id}`, test);

//DELETE
const deleteTestById = async (id) => await sendDelete(`teacher/test/${id}`);

export {
  createTest,
  deleteTestById,
  getAllTests,
  updateTest,
  getAllTestsByLessonId,
  uploadListQuestionsByTestId,
};
