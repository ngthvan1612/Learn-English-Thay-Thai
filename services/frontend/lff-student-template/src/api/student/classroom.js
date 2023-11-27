//CRUD-BASE
import { getCurrentUserId } from '../../authorization'
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createClassroom = async (classroom) => await sendPost('student/classroom', classroom)

//READ
const getAllClassrooms = async () => await sendGet('student/classroom')

const getMyClassrooms = async() => await sendGet(`student/classroom`, {
  params: {
    'student_id.equal': getCurrentUserId()
  }
})

const getClassroomById = async(classroomId) => await sendGet(`student/classroom/${classroomId}`)

//UPDATE
const updateClassroom = async (id, classroom) => await sendPut(`student/classroom/${id}`, classroom)

//DELETE
const deleteClassroomById = async (id) => await sendDelete(`student/classroom/${id}`)

export {
  createClassroom, deleteClassroomById, getAllClassrooms, updateClassroom,
  getMyClassrooms, getClassroomById
}
