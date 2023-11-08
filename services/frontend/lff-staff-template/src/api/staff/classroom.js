//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createClassroom = async (classroom) => await sendPost('admin/classroom', classroom)

//READ
const getAllClassrooms = async () => await sendGet('admin/classroom')

const getListClassroomWithNumberOfRegistered = async() => sendGet(`admin/classroom/listClassroomsWithNumberOfStudents`)

//UPDATE
const updateClassroom = async (id, classroom) => await sendPut(`admin/classroom/${id}`, classroom)

//DELETE
const deleteClassroomById = async (id) => await sendDelete(`admin/classroom/${id}`)

export {
  createClassroom, deleteClassroomById, getAllClassrooms, updateClassroom,
  getListClassroomWithNumberOfRegistered
}
