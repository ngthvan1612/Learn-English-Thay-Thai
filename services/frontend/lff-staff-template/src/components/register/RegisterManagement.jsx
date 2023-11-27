import CreateRegister from './CreateRegister'
import UpdateRegister from './UpdateRegister'
import { ConfirmDeleteRegister } from './DeleteRegister'
import { StaffRegisterApi } from '../../api'
import { useEffect, useState } from 'react'
import ListClassrooms from './ListClassrooms'

function RegisterManagement(props) {

  const [getRegisters, setRegisters] = useState([])
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [getCurrentRegisterEdit, setCurrentRegisterEdit] = useState({})

  const reloadListRegisters = () => {
    StaffRegisterApi.getAllRegisters()
      .then(response => {
        const { messages, data: registers } = response.data
        setRegisters([...registers]);
      })
      .catch(error => {

      })
  }

  const handleEditRegister = (register) => {
    setEditModalOpen(true)
    setCurrentRegisterEdit(register)
  }

  const handleDeleteRegister = (register) => {
    ConfirmDeleteRegister(register, () => reloadListRegisters())
  }

  useEffect(() => reloadListRegisters(), [])

  return (
    <>
      <CreateRegister
        onClose={reloadListRegisters}
      />

      <UpdateRegister
        onClose={reloadListRegisters}
        currentRegisterEdit={getCurrentRegisterEdit}
        isEditModalOpen={isEditModalOpen}
        setEditModalOpen={setEditModalOpen}
      />
      <ListClassrooms/>
    </>
  )
}

export default RegisterManagement