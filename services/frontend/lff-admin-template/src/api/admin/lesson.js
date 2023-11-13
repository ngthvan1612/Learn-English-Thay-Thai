//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createLesson = async (lesson) => await sendPost('admin/lesson', lesson)

//READ
const getAllLessons = async () => await sendGet('admin/lesson')

//UPDATE
const updateLesson = async (id, lesson) => await sendPut(`admin/lesson/${id}`, lesson)

//DELETE
const deleteLessonById = async (id) => await sendDelete(`admin/lesson/${id}`)

export {
  createLesson, deleteLessonById, getAllLessons, updateLesson
}
