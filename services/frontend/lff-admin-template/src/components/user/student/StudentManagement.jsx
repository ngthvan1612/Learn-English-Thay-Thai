import { AdminUserApi } from '../../../api'
import { useEffect, useState } from 'react'
import { Card, Col, Grid, Row } from 'antd'
import { ROLE_STUDENT } from '../../../authorization'
import CreateUser from '../CreateUser'
import UpdateUser from '../UpdateUser'
import { ConfirmDeleteUser } from '../DeleteUser'
import ListUsers from '../ListUsers'

function StudentManagement(props) {

  const [getUsers, setUsers] = useState([])
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [getCurrentUserEdit, setCurrentUserEdit] = useState({})

  const reloadListUsers = () => {
    AdminUserApi.getListsUserByRole(ROLE_STUDENT)
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
        role={ROLE_STUDENT}
      />

      <UpdateUser
        onClose={reloadListUsers}
        currentUserEdit={getCurrentUserEdit}
        isEditModalOpen={isEditModalOpen}
        setEditModalOpen={setEditModalOpen}
        role={ROLE_STUDENT}
      />
      
      <Row>
        <Col span={24}>
          <ListUsers
            users={getUsers}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            role={ROLE_STUDENT}
          /></Col>
      </Row>
    </>
  )
}

export default StudentManagement