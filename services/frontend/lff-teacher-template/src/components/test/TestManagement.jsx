import CreateTest from "./CreateTest";
import ListTests from "./ListTests";
import UpdateTest from "./UpdateTest";
import { ConfirmDeleteTest } from "./DeleteTest";
import { TeacherTestApi, TeacherLessonApi } from "../../api";
import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../toast";
import { useParams } from "react-router-dom";

function TestManagement(props) {
  const [getTests, setTests] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [getCurrentTestEdit, setCurrentTestEdit] = useState({});
  const [lessonName, setLessonName] = useState("");

  // const reloadListTests = () => {
  //   TeacherTestApi.getAllTests()
  //     .then((response) => {
  //       const { messages, data: tests } = response.data;
  //       setTests([...tests]);
  //     })
  //     .catch((error) => {});
  // };

  const { lessonId } = useParams();

  const reloadListTestsByLessonId = () => {
    TeacherTestApi.getAllTestsByLessonId(lessonId)
      .then((response) => {
        console.log(response);
        const { messages, data: tests } = response.data;
        setTests([...tests]);
      })
      .catch((error) => {
        console.log(error);
      });
    TeacherLessonApi.getLessonById(lessonId)
      .then((response) => {
        // console.log(response);
        setLessonName(response.data.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditTest = (test) => {
    setEditModalOpen(true);
    setCurrentTestEdit(test);
  };

  const handleDeleteTest = (test) => {
    ConfirmDeleteTest(test, () => reloadListTestsByLessonId());
  };

  useEffect(() => {
    reloadListTestsByLessonId();
  }, []);

  return (
    <>
      <CreateTest
        onClose={reloadListTestsByLessonId}
        lessonName={lessonName}
        lessonId={lessonId}
      />
      <UpdateTest
        onClose={reloadListTestsByLessonId}
        currentTestEdit={getCurrentTestEdit}
        isEditModalOpen={isEditModalOpen}
        setEditModalOpen={setEditModalOpen}
        lessonName={lessonName}
        lessonId={lessonId}
      />
      <ListTests
        tests={getTests}
        onEdit={handleEditTest}
        onDelete={handleDeleteTest}
      />
    </>
  );
}

export default TestManagement;
