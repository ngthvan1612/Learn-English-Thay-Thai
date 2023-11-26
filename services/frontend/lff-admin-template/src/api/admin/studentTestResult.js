//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createStudentTestResult = async (studenttestresult) => await sendPost('admin/studenttestresult', studenttestresult)

//READ
const getAllStudentTestResults = async () => await sendGet('admin/studenttestresult')

//UPDATE
const updateStudentTestResult = async (id, studenttestresult) => await sendPut(`admin/studenttestresult/${id}`, studenttestresult)

//DELETE
const deleteStudentTestResultById = async (id) => await sendDelete(`admin/studenttestresult/${id}`)

export {
  createStudentTestResult, deleteStudentTestResultById, getAllStudentTestResults, updateStudentTestResult
}
