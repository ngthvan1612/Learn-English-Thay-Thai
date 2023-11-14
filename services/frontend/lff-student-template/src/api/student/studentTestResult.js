//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createStudentTestResult = async (studenttestresult) => await sendPost('student/studenttestresult', studenttestresult)

//READ
const getAllStudentTestResults = async () => await sendGet('student/studenttestresult')

//UPDATE
const updateStudentTestResult = async (id, studenttestresult) => await sendPut(`student/studenttestresult/${id}`, studenttestresult)

const updateAnswerByStudentTestResult = async(studentTestId, questionId, result) => await sendPost(`student/studenttestresult`, {
  studentTestId, questionId, result
})

//DELETE
const deleteStudentTestResultById = async (id) => await sendDelete(`student/studenttestresult/${id}`)

export {
  createStudentTestResult, deleteStudentTestResultById, getAllStudentTestResults, updateStudentTestResult,
  updateAnswerByStudentTestResult
}
