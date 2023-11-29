//CRUD-BASE
import { sendDelete, sendGet, sendPost, sendPut } from '../../axios'

//CREATE
const createRegister = async (register) => await sendPost('teacher/register', register)

//READ
const getAllRegisters = async () => await sendGet('teacher/register')

//UPDATE
const updateRegister = async (id, register) => await sendPut(`teacher/register/${id}`, register)

//DELETE
const deleteRegisterById = async (id) => await sendDelete(`teacher/register/${id}`)

export {
  createRegister, deleteRegisterById, getAllRegisters, updateRegister
}
