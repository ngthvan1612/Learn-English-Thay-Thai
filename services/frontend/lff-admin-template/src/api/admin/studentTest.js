//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createStudentTest = async (studenttest) => await sendPost('admin/studenttest', studenttest)

//READ
const getAllStudentTests = async () => await sendGet('admin/studenttest')

//UPDATE
const updateStudentTest = async (id, studenttest) => await sendPut(`admin/studenttest/${id}`, studenttest)

//DELETE
const deleteStudentTestById = async (id) => await sendDelete(`admin/studenttest/${id}`)

export {
  createStudentTest, deleteStudentTestById, getAllStudentTests, updateStudentTest
}
