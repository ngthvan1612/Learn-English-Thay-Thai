import CreateStudentTestResult from './CreateStudentTestResult'
import ListStudentTestResults from './ListStudentTestResults'
import UpdateStudentTestResult from './UpdateStudentTestResult'
import { ConfirmDeleteStudentTestResult } from './DeleteStudentTestResult'
import { TeacherStudentTestResultApi } from '../../api'
import { useEffect, useState } from 'react'
import { toastError, toastSuccess } from '../../toast'

function StudentTestResultManagement(props) {

  const [getStudentTestResults, setStudentTestResults] = useState([])
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [getCurrentStudentTestResultEdit, setCurrentStudentTestResultEdit] = useState({})

  const reloadListStudentTestResults = () => {
    TeacherStudentTestResultApi.getAllStudentTestResults()
      .then(response => {
        const { messages, data: studenttestresults } = response.data
        setStudentTestResults([...studenttestresults]);
      })
      .catch(error => {

      })
  }

  const handleEditStudentTestResult = (studenttestresult) => {
    setEditModalOpen(true)
    setCurrentStudentTestResultEdit(studenttestresult)
  }

  const handleDeleteStudentTestResult = (studenttestresult) => {
    ConfirmDeleteStudentTestResult(studenttestresult, () => reloadListStudentTestResults())
  }

  useEffect(() => reloadListStudentTestResults(), [])

  return (
    <>
      <CreateStudentTestResult
        onClose={reloadListStudentTestResults}
      />

      <UpdateStudentTestResult
        onClose={reloadListStudentTestResults}
        currentStudentTestResultEdit={getCurrentStudentTestResultEdit}
        isEditModalOpen={isEditModalOpen}
        setEditModalOpen={setEditModalOpen}
      />
      <ListStudentTestResults
        studenttestresults={getStudentTestResults}
        onEdit={handleEditStudentTestResult}
        onDelete={handleDeleteStudentTestResult}
      />
    </>
  )
}

export default StudentTestResultManagement