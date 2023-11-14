//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createRegister = async (register) => await sendPost('student/register', register)

//READ
const getAllRegisters = async () => await sendGet('student/register')

//UPDATE
const updateRegister = async (id, register) => await sendPut(`student/register/${id}`, register)

//DELETE
const deleteRegisterById = async (id) => await sendDelete(`student/register/${id}`)

export {
  createRegister, deleteRegisterById, getAllRegisters, updateRegister
}
