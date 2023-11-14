//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createQuestion = async (question) => await sendPost('student/question', question)

//READ
const getAllQuestions = async () => await sendGet('student/question')

//UPDATE
const updateQuestion = async (id, question) => await sendPut(`student/question/${id}`, question)

//DELETE
const deleteQuestionById = async (id) => await sendDelete(`student/question/${id}`)

export {
  createQuestion, deleteQuestionById, getAllQuestions, updateQuestion
}
