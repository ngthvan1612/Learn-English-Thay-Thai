import CreateUser from './CreateUser'
import ListUsers from './ListUsers'
import UpdateUser from './UpdateUser'
import { ConfirmDeleteUser } from './DeleteUser'
import { AdminUserApi } from '../../api'
import { useEffect, useState } from 'react'
import { toastError, toastSuccess } from '../../toast'
import { Card, Col, Grid, Row } from 'antd'

function UserManagement(props) {

  const [getUsers, setUsers] = useState([])
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [getCurrentUserEdit, setCurrentUserEdit] = useState({})

  const reloadListUsers = () => {
    AdminUserApi.getAllUsers()
      .then(response => {
        const { messages, data: users } = response.data
        setUsers([...users]);
      })
      .catch(error => {

      })
  }

  const handleEditUser = (user) => {
    setEditModalOpen(true)
    setCurrentUserEdit(user)
  }

  const handleDeleteUser = (user) => {
    ConfirmDeleteUser(user, () => reloadListUsers())
  }

  useEffect(() => reloadListUsers(), [])

  return (
    <>
      <CreateUser
        onClose={reloadListUsers}
      />

      <UpdateUser
        onClose={reloadListUsers}
        currentUserEdit={getCurrentUserEdit}
        isEditModalOpen={isEditModalOpen}
        setEditModalOpen={setEditModalOpen}
      />
      
      <Row>
        <Col span={24}>
          <ListUsers
            users={getUsers}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          /></Col>
      </Row>
    </>
  )
}

export default UserManagement