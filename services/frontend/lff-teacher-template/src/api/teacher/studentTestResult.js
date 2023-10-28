//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createStudentTestResult = async (studenttestresult) => await sendPost('teacher/studenttestresult', studenttestresult)

//READ
const getAllStudentTestResults = async () => await sendGet('teacher/studenttestresult')

//UPDATE
const updateStudentTestResult = async (id, studenttestresult) => await sendPut(`teacher/studenttestresult/${id}`, studenttestresult)

//DELETE
const deleteStudentTestResultById = async (id) => await sendDelete(`teacher/studenttestresult/${id}`)

export {
  createStudentTestResult, deleteStudentTestResultById, getAllStudentTestResults, updateStudentTestResult
}
