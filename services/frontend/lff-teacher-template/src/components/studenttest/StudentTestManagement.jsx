import CreateStudentTest from './CreateStudentTest'
import ListStudentTests from './ListStudentTests'
import UpdateStudentTest from './UpdateStudentTest'
import { ConfirmDeleteStudentTest } from './DeleteStudentTest'
import { TeacherStudentTestApi } from '../../api'
import { useEffect, useState } from 'react'
import { toastError, toastSuccess } from '../../toast'

function StudentTestManagement(props) {

  const [getStudentTests, setStudentTests] = useState([])
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [getCurrentStudentTestEdit, setCurrentStudentTestEdit] = useState({})

  const reloadListStudentTests = () => {
    TeacherStudentTestApi.getAllStudentTests()
      .then(response => {
        const { messages, data: studenttests } = response.data
        setStudentTests([...studenttests]);
      })
      .catch(error => {

      })
  }

  const handleEditStudentTest = (studenttest) => {
    setEditModalOpen(true)
    setCurrentStudentTestEdit(studenttest)
  }

  const handleDeleteStudentTest = (studenttest) => {
    ConfirmDeleteStudentTest(studenttest, () => reloadListStudentTests())
  }

  useEffect(() => reloadListStudentTests(), [])

  return (
    <>
      <CreateStudentTest
        onClose={reloadListStudentTests}
      />

      <UpdateStudentTest
        onClose={reloadListStudentTests}
        currentStudentTestEdit={getCurrentStudentTestEdit}
        isEditModalOpen={isEditModalOpen}
        setEditModalOpen={setEditModalOpen}
      />
      <ListStudentTests
        studenttests={getStudentTests}
        onEdit={handleEditStudentTest}
        onDelete={handleDeleteStudentTest}
      />
    </>
  )
}

export default StudentTestManagement