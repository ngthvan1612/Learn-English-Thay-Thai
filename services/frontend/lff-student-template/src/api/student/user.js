//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createUser = async (user) => await sendPost('student/user', user)

//READ
const getAllUsers = async () => await sendGet('student/user')

//UPDATE
const updateUser = async (id, user) => await sendPut(`student/user/${id}`, user)

//DELETE
const deleteUserById = async (id) => await sendDelete(`student/user/${id}`)

export {
  createUser, deleteUserById, getAllUsers, updateUser
}
