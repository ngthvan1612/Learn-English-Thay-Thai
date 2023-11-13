//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createLesson = async (lesson) => await sendPost('student/lesson', lesson)

//READ
const getAllLessons = async () => await sendGet('student/lesson')

const getAllLessonsByClassId = async(classId) => await sendGet('student/lesson', {
  params: {
    'classroom_id.equal': classId
  }
})

const getAllLessonsByStudentId = async(studentId) => await sendGet('student/lesson', {
  params: {
    'student_id.equal': studentId
  }
})

const getLessonById = async(lessonId) => await sendGet(`student/lesson/${lessonId}`)

//UPDATE
const updateLesson = async (id, lesson) => await sendPut(`student/lesson/${id}`, lesson)

//DELETE
const deleteLessonById = async (id) => await sendDelete(`student/lesson/${id}`)

export {
  createLesson, deleteLessonById, getAllLessons, updateLesson, getAllLessonsByStudentId,
  getAllLessonsByClassId, getLessonById
}
