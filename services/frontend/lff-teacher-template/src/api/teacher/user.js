//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createUser = async (user) => await sendPost('teacher/user', user)

//READ
const getAllUsers = async () => await sendGet('teacher/user')

//UPDATE
const updateUser = async (id, user) => await sendPut(`teacher/user/${id}`, user)

const changeMyPassword = async(userId, oldPassword, newPassword) => await sendPost(`/teacher/user/change-password`, {
  oldPassword, newPassword
});

//DELETE
const deleteUserById = async (id) => await sendDelete(`teacher/user/${id}`)

export {
  createUser, deleteUserById, getAllUsers, updateUser, changeMyPassword
}
