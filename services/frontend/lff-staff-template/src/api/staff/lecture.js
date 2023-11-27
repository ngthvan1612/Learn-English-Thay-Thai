//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createLecture = async (lecture) => await sendPost('admin/lecture', lecture)

//READ
const getAllLectures = async () => await sendGet('admin/lecture')

//UPDATE
const updateLecture = async (id, lecture) => await sendPut(`admin/lecture/${id}`, lecture)

//DELETE
const deleteLectureById = async (id) => await sendDelete(`admin/lecture/${id}`)

export {
  createLecture, deleteLectureById, getAllLectures, updateLecture
}
