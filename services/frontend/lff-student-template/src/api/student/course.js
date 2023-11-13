//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createCourse = async (course) => await sendPost('student/course', course)

//READ
const getAllCourses = async () => await sendGet('student/course')

//UPDATE
const updateCourse = async (id, course) => await sendPut(`student/course/${id}`, course)

//DELETE
const deleteCourseById = async (id) => await sendDelete(`student/course/${id}`)

export {
  createCourse, deleteCourseById, getAllCourses, updateCourse
}
