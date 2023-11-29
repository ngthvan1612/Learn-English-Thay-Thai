//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createLecture = async (lecture) => await sendPost('teacher/lecture', lecture)

//READ
const getAllLectures = async () => await sendGet('teacher/lecture')

//UPDATE
const updateLecture = async (id, lecture) => await sendPut(`teacher/lecture/${id}`, lecture)

//DELETE
const deleteLectureById = async (id) => await sendDelete(`teacher/lecture/${id}`)

export {
  createLecture, deleteLectureById, getAllLectures, updateLecture
}
