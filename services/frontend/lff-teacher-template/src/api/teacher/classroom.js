//CRUD-BASE
import { getCurrentUserId } from "../../authorization";
import { sendDelete, sendGet, sendPost, sendPut } from "../../axios";

//CREATE
const createClassroom = async (classroom) =>
  await sendPost("teacher/classroom", classroom);

//READ
const getAllClassrooms = async () => await sendGet("teacher/classroom");

const getMyClasses = async () =>
  await sendGet("teacher/classroom", {
    params: {
      "teacher_id.equal": getCurrentUserId(),
    },
  });

const getClassRoomById = async (id) => {
  return await sendGet(`teacher/classroom/${id}`);
};

//UPDATE
const updateClassroom = async (id, classroom) =>
  await sendPut(`teacher/classroom/${id}`, classroom);

//DELETE
const deleteClassroomById = async (id) =>
  await sendDelete(`teacher/classroom/${id}`);

export {
  createClassroom,
  deleteClassroomById,
  getAllClassrooms,
  updateClassroom,
  getMyClasses,
  getClassRoomById,
};
