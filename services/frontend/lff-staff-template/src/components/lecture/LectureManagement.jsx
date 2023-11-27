import ListLectures from './ListLectures'
import ViewLecture from './ViewLecture'
import { StaffLectureApi, StaffLessonApi } from '../../api'
import { useEffect, useState } from 'react'
import { toastError, toastSuccess } from '../../toast'

function LectureManagement(props) {

  //const [currentLessonId, setCurrentLessonId] = useState('');
  const [currentLesson, setCurrentLesson] = useState({})
  const [getLectures, setLessons] = useState([])
  const [isViewLectureShowing, setViewLectureShowing] = useState(false);

  const reloadListLectures = () => {
    StaffLessonApi.getAllLessons()
      .then(response => {
        const { messages, data: lessons } = response.data
        setLessons([...lessons]);
        //setLectures([...lectures]);
      })
      .catch(error => {

      })
  }

  const handleViewLecture = (lecture) => {
    setCurrentLesson(lecture);
    setViewLectureShowing(true);
  }

  useEffect(() => reloadListLectures(), [])

  return (
    <>
      <ViewLecture isShowing={isViewLectureShowing} setShowing={setViewLectureShowing}
        lesson={currentLesson}
        onAfterApproved={() => reloadListLectures()}/>
      <ListLectures
        lectures={getLectures}
        onView={handleViewLecture}
      />
    </>
  )
}

export default LectureManagement