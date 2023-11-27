//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//UPDATE
const updateApprovalLesson = async(lessonId, isApproved, reason) => sendPut(`admin/lesson/${lessonId}/update-approval`, {
  isApproved,
  reason
})

//READ
const getAllLessons = async () => await sendGet('admin/lesson')

const getLessonById = async (id, lesson) => await sendGet(`admin/lesson/${id}`, lesson)

export {
  getAllLessons, getLessonById,
  updateApprovalLesson
}
