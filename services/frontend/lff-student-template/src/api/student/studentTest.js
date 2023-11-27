//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createStudentTest = async (studenttest) => await sendPost('student/studenttest', studenttest)

const startRunningTest = async(studentId, testId) => await sendPost('student/studenttest', {
  studentId,
  testId
})

//READ
const getAllStudentTests = async () => await sendGet('student/studenttest')

const getAllQuestionByStudentTestId = async(studentTestId) => await sendGet(`student/studenttest/${studentTestId}/status`)

const getHistoryByStudentIdAndTestIdAsync = async(studentId, testId) => await sendGet(`student/studenttest/history`, {
  params: {
    studentId, testId
  }
})

const submitTest = async (studentTestId) =>await sendPost(`student/studenttest/${studentTestId}/submit`)

//UPDATE
const updateStudentTest = async (id, studenttest) => await sendPut(`student/studenttest/${id}`, studenttest)

//DELETE
const deleteStudentTestById = async (id) => await sendDelete(`student/studenttest/${id}`)

const getStudentTestIsRunning = async (studentId) => await sendGet(`student/studenttest/`, {
  params : {
    'student_id.equal': studentId,
    //'test_id.equal': testId,
    'is_running.equal': 'true' 
  }
})

export {
  createStudentTest, deleteStudentTestById, getAllStudentTests, updateStudentTest, getStudentTestIsRunning,
  startRunningTest, getAllQuestionByStudentTestId, getHistoryByStudentIdAndTestIdAsync, submitTest
}
