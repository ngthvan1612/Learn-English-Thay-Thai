//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createCourse = async (course) => await sendPost('teacher/course', course)

//READ
const getAllCourses = async () => await sendGet('teacher/course')

//UPDATE
const updateCourse = async (id, course) => await sendPut(`teacher/course/${id}`, course)

//DELETE
const deleteCourseById = async (id) => await sendDelete(`teacher/course/${id}`)

export {
  createCourse, deleteCourseById, getAllCourses, updateCourse
}
