//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createQuestion = async (question) => await sendPost('admin/question', question)

//READ
const getAllQuestions = async () => await sendGet('admin/question')

//UPDATE
const updateQuestion = async (id, question) => await sendPut(`admin/question/${id}`, question)

//DELETE
const deleteQuestionById = async (id) => await sendDelete(`admin/question/${id}`)

export {
  createQuestion, deleteQuestionById, getAllQuestions, updateQuestion
}
