//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createTest = async (test) => await sendPost('admin/test', test)

//READ
const getAllTests = async () => await sendGet('admin/test')

//UPDATE
const updateTest = async (id, test) => await sendPut(`admin/test/${id}`, test)

//DELETE
const deleteTestById = async (id) => await sendDelete(`admin/test/${id}`)

export {
  createTest, deleteTestById, getAllTests, updateTest
}
