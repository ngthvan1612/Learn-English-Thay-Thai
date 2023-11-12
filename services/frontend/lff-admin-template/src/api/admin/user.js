//CRUD-BASE
import { ROLE_STAFF, ROLE_STUDENT, ROLE_TEACHER } from '../../authorization'
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createUser = async (user) => await sendPost('admin/user', user)

const createUserWithRole = async(user, role) => await sendPost('admin/user', {
  ...user,
  role
})

const createTeacher = async(user) => await sendPost('admin/user', {
  ...user,
  role: ROLE_TEACHER
})

const createStudent = async(user) => await sendPost('admin/user', {
  ...user,
  role: ROLE_STUDENT
})

const createStaff = async(user) => await sendPost('admin/user', {
  ...user,
  role: ROLE_STAFF
})

//READ
const getAllUsers = async () => await sendGet('admin/user')

const getListUserByRole = async(role) => await sendGet('admin/user', {
  params: {
    'role.equal': role
  }
})

//UPDATE
const updateUser = async (id, user) => await sendPut(`admin/user/${id}`, user)

//DELETE
const deleteUserById = async (id) => await sendDelete(`admin/user/${id}`)

export {
  createUser, deleteUserById, getAllUsers, updateUser,
  createTeacher, createStudent, createStaff, createUserWithRole, getListUserByRole as getListsUserByRole
}
