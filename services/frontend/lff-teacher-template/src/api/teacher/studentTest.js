//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createStudentTest = async (studenttest) => await sendPost('teacher/studenttest', studenttest)

//READ
const getAllStudentTests = async () => await sendGet('teacher/studenttest')

//UPDATE
const updateStudentTest = async (id, studenttest) => await sendPut(`teacher/studenttest/${id}`, studenttest)

//DELETE
const deleteStudentTestById = async (id) => await sendDelete(`teacher/studenttest/${id}`)

export {
  createStudentTest, deleteStudentTestById, getAllStudentTests, updateStudentTest
}
