//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createTest = async (test) => await sendPost('student/test', test)

//READ
const getAllTests = async () => await sendGet('student/test')

const getTestsByLessonId = async(lessonId) => await sendGet('student/test', {
  params: {
    'lesson_id.equal': lessonId
  }
})

//UPDATE
const updateTest = async (id, test) => await sendPut(`student/test/${id}`, test)

//DELETE
const deleteTestById = async (id) => await sendDelete(`student/test/${id}`)

export {
  createTest, deleteTestById, getAllTests, updateTest, getTestsByLessonId
}
