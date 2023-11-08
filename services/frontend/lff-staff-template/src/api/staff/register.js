//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createRegister = async (register) => await sendPost('admin/register', register)

//READ
const getAllRegisters = async () => await sendGet('admin/register')

const getAllRegisteredStudentsByClassroomId = async(classroomId) => sendGet('admin/register', {
  params: {
    'class_id.equal': classroomId
  }
})

//UPDATE
const updateRegister = async (id, register) => await sendPut(`admin/register/${id}`, register)

//DELETE
const deleteRegisterById = async (id) => await sendDelete(`admin/register/${id}`)

export {
  createRegister, deleteRegisterById, getAllRegisters, updateRegister,
  getAllRegisteredStudentsByClassroomId
}
