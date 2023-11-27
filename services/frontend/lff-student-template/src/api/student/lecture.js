//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createLecture = async (lecture) => await sendPost('student/lecture', lecture)

//READ
const getAllLectures = async () => await sendGet('student/lecture')

//UPDATE
const updateLecture = async (id, lecture) => await sendPut(`student/lecture/${id}`, lecture)

//DELETE
const deleteLectureById = async (id) => await sendDelete(`student/lecture/${id}`)

export {
  createLecture, deleteLectureById, getAllLectures, updateLecture
}
