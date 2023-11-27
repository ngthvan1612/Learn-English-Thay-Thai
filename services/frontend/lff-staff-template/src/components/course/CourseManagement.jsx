import CreateCourse from './CreateCourse'
import ListCourses from './ListCourses'
import UpdateCourse from './UpdateCourse'
import { ConfirmDeleteCourse } from './DeleteCourse'
import { StaffCourseApi } from '../../api'
import { useEffect, useState } from 'react'
import { toastError, toastSuccess } from '../../toast'

function CourseManagement(props) {

  const [getCourses, setCourses] = useState([])
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [getCurrentCourseEdit, setCurrentCourseEdit] = useState({})

  const reloadListCourses = () => {
    StaffCourseApi.getAllCourses()
      .then(response => {
        const { messages, data: courses } = response.data
        setCourses([...courses]);
      })
      .catch(error => {

      })
  }

  const handleEditCourse = (course) => {
    setEditModalOpen(true)
    setCurrentCourseEdit(course)
  }

  const handleDeleteCourse = (course) => {
    ConfirmDeleteCourse(course, () => reloadListCourses())
  }

  useEffect(() => reloadListCourses(), [])

  return (
    <>
      <CreateCourse
        onClose={reloadListCourses}
      />

      <UpdateCourse
        onClose={reloadListCourses}
        currentCourseEdit={getCurrentCourseEdit}
        isEditModalOpen={isEditModalOpen}
        setEditModalOpen={setEditModalOpen}
      />
      <ListCourses
        courses={getCourses}
        onEdit={handleEditCourse}
        onDelete={handleDeleteCourse}
      />
    </>
  )
}

export default CourseManagement