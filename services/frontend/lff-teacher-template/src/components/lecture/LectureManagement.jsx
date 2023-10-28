import CreateLecture from './CreateLecture'
import ListLectures from './ListLectures'
import UpdateLecture from './UpdateLecture'
import { ConfirmDeleteLecture } from './DeleteLecture'
import { TeacherLectureApi } from '../../api'
import { useEffect, useState } from 'react'
import { toastError, toastSuccess } from '../../toast'

function LectureManagement(props) {

  const [getLectures, setLectures] = useState([])
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [getCurrentLectureEdit, setCurrentLectureEdit] = useState({})

  const reloadListLectures = () => {
    TeacherLectureApi.getAllLectures()
      .then(response => {
        const { messages, data: lectures } = response.data
        setLectures([...lectures]);
      })
      .catch(error => {

      })
  }

  const handleEditLecture = (lecture) => {
    setEditModalOpen(true)
    setCurrentLectureEdit(lecture)
  }

  const handleDeleteLecture = (lecture) => {
    ConfirmDeleteLecture(lecture, () => reloadListLectures())
  }

  useEffect(() => reloadListLectures(), [])

  return (
    <>
      <CreateLecture
        onClose={reloadListLectures}
      />

      <UpdateLecture
        onClose={reloadListLectures}
        currentLectureEdit={getCurrentLectureEdit}
        isEditModalOpen={isEditModalOpen}
        setEditModalOpen={setEditModalOpen}
      />
      <ListLectures
        lectures={getLectures}
        onEdit={handleEditLecture}
        onDelete={handleDeleteLecture}
      />
    </>
  )
}

export default LectureManagement