//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from "../../axios";

//CREATE
const createLesson = async (lesson) => await sendPost("teacher/lesson", lesson);

//READ
const getAllLessons = async () => await sendGet("teacher/lesson");

const getAllLessonsByClassId = async (classId) => {
  return await sendGet("teacher/lesson", {
    params: {
      "classroom_id.equal": classId,
    },
  });
};

const getLessonById = async (lessonId) =>
  await sendGet(`teacher/lesson/${lessonId}`);

//UPDATE
const updateLesson = async (id, lesson) =>
  await sendPut(`teacher/lesson/${id}`, lesson);

const updateLessonContent = async (lessonId, content) =>
  await sendPut(`teacher/lesson/${lessonId}/content`, {
    lessonContent: content,
  });

//DELETE
const deleteLessonById = async (id) => await sendDelete(`teacher/lesson/${id}`);

export {
  createLesson,
  deleteLessonById,
  getAllLessons,
  updateLesson,
  getAllLessonsByClassId,
  updateLessonContent,
  getLessonById,
};
