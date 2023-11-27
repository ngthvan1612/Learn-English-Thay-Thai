//CRUD-BASE
import { ROLE_STUDENT, ROLE_TEACHER } from '../../authorization'
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createUser = async (user) => await sendPost('admin/user', user)

const createUserWithRole = async(user, role) => await sendPost('admin/user', {
  ...user,
  role
})

const createStudent = async(user) => await sendPost('admin/user', {
  ...user,
  role: ROLE_STUDENT
})


//READ
const getAllUsers = async () => await sendGet('admin/user')

const getAllTeachers = async() => await sendGet('admin/user', {
  params: {
    'role.equal': ROLE_TEACHER
  }
})

const getAllStudents = async() => await sendGet('admin/user', {
  params: {
    'role.equal': ROLE_STUDENT
  }
})

const getListUserByRole = async(role) => await sendGet('admin/user', {
  params: {
    'role.equal': role
  }
})

//UPDATE
const updateUser = async (id, user) => await sendPut(`admin/user/${id}`, user)

const updateUserPassword = async(userId, newPassword) => await sendPost(`admin/user/${userId}/update-password`, {
  password: newPassword
})

//DELETE
const deleteUserById = async (id) => await sendDelete(`admin/user/${id}`)

export {
  createUser, deleteUserById, getAllUsers, updateUser, getAllTeachers,
  createStudent, createUserWithRole, getListUserByRole as getListsUserByRole,
  updateUserPassword, getAllStudents
}
