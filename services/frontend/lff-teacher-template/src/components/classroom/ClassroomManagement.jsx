import CreateClassroom from "./CreateClassroom";
import ListClassrooms from "./ListClassrooms";
import UpdateClassroom from "./UpdateClassroom";
import { ConfirmDeleteClassroom } from "./DeleteClassroom";
import { TeacherClassroomApi } from "../../api";
import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../toast";

function ClassroomManagement(props) {
  const [getClassrooms, setClassrooms] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [getCurrentClassroomEdit, setCurrentClassroomEdit] = useState({});

  const reloadListClassrooms = () => {
    TeacherClassroomApi.getMyClasses()
      .then((response) => {
        const { messages, data: classrooms } = response.data;
        setClassrooms([...classrooms]);
      })
      .catch((error) => {});
  };


  const handleEditClassroom = (classroom) => {
    setEditModalOpen(true);
    setCurrentClassroomEdit(classroom);
  };

  const handleDeleteClassroom = (classroom) => {
    ConfirmDeleteClassroom(classroom, () => reloadListClassrooms());
  };

  useEffect(() => reloadListClassrooms(), []);

  return (
    <>
      {/* <CreateClassroom
        onClose={reloadListClassrooms}
      /> */}
      {/* <UpdateClassroom
        onClose={reloadListClassrooms}
        currentClassroomEdit={getCurrentClassroomEdit}
        isEditModalOpen={isEditModalOpen}
        setEditModalOpen={setEditModalOpen}
      /> */}
      <ListClassrooms
        classrooms={getClassrooms}
        onEdit={handleEditClassroom}
        onDelete={handleDeleteClassroom}
      />
    </>
  );
}

export default ClassroomManagement;
