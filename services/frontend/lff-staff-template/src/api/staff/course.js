//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createCourse = async (course) => await sendPost('admin/course', course)

//READ
const getAllCourses = async () => await sendGet('admin/course')

//UPDATE
const updateCourse = async (id, course) => await sendPut(`admin/course/${id}`, course)

//DELETE
const deleteCourseById = async (id) => await sendDelete(`admin/course/${id}`)

export {
  createCourse, deleteCourseById, getAllCourses, updateCourse
}
