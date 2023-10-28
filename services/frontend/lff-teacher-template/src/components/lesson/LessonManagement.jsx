import CreateLesson from "./CreateLesson";
import ListLessons from "./ListLessons";
import UpdateLesson from "./UpdateLesson";
import LessonEditPage from "./LessonEditPage";
import { ConfirmDeleteLesson } from "./DeleteLesson";
import { TeacherLessonApi } from "../../api";
import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../toast";
import { useParams } from "react-router-dom";

function LessonManagement(props) {
  const [getLessons, setLessons] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [getCurrentLessonEdit, setCurrentLessonEdit] = useState({});
  const params = useParams();
  const reloadListLessons = () => {
    TeacherLessonApi.getAllLessonsByClassId(params.classId)
      .then((response) => {
        const { messages, data: lessons } = response.data;
        setLessons([...lessons]);
      })
      .catch((error) => {});
  };

  const handleEditLesson = (lesson) => {
    setEditModalOpen(true);
    setCurrentLessonEdit(lesson);
  };

  const handleDeleteLesson = (lesson) => {
    ConfirmDeleteLesson(lesson, () => reloadListLessons());
  };

  useEffect(() => reloadListLessons(), []);

  return (
    <>
      <CreateLesson onClose={reloadListLessons} classId={params.classId} />
      <UpdateLesson
        onClose={reloadListLessons}
        currentLessonEdit={getCurrentLessonEdit}
        isEditModalOpen={isEditModalOpen}
        setEditModalOpen={setEditModalOpen}
        classId={params.classId}
      />
      <ListLessons
        lessons={getLessons}
        onEdit={handleEditLesson}
        onDelete={handleDeleteLesson}
        classId={params.classId}
      />
      {/* <LessonEditPage
        lessons={getLessons}
        onEdit={handleEditLesson}
        onDelete={handleDeleteLesson}
        classId={params.classId}
      /> */}
    </>
  );
}

export default LessonManagement;
