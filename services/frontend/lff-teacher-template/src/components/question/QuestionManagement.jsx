import CreateQuestion from "./CreateQuestion";
import ListQuestions from "./ListQuestions";
import UpdateQuestionn from "./UpdateQuestionn";
import { ConfirmDeleteQuestion } from "./DeleteQuestion";
import { TeacherQuestionApi, TeacherTestApi } from "../../api";
import { useEffect, useState } from "react";
import {
  processCreateSuccessResponse,
  processErrorResponse,
  toastError,
  toastSuccess,
} from "../../toast";
import { useParams } from "react-router-dom";
import { Button, Upload } from "antd";
import CreateMultipleChoiceModal from "../question/MultipleChoice/CreateMultipleChoiceModal";

function QuestionManagement(props) {
  const [getQuestions, setQuestions] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [getCurrentQuestionEdit, setCurrentQuestionEdit] = useState({});

  const { testId } = useParams();

  const reloadListQuestionsByTestId = () => {
    TeacherQuestionApi.getAllQuestionsByTestId(testId)
      .then((response) => {
        const { messages, data: questions } = response.data;
        setQuestions([...questions]);
      })
      .catch((error) => {});
  };

  const handleEditQuestion = (question) => {
    setEditModalOpen(true);
    setCurrentQuestionEdit(question);
  };

  const handleDeleteQuestion = (question) => {
    ConfirmDeleteQuestion(question, () => reloadListQuestionsByTestId());
  };

  useEffect(() => reloadListQuestionsByTestId(), []);

  const [isCreateQuestionModalOpen, setCreateQuestionModalOpen] =
    useState(false);

  const { classId, lessonId } = useParams();

  function onAfterCreatedModal(data) {
    const jsonStrData = JSON.stringify(data);
    TeacherQuestionApi.createQuestion({
      content: jsonStrData,
      questionType: "MULTIPLE-CHOCIE",
      testId: testId,
    })
      .then((resp) => {
        processCreateSuccessResponse(resp);
        setCreateQuestionModalOpen(false);
      })
      .catch((err) => {
        processErrorResponse(err);
      });
  }

  const [fileList, setFileList] = useState([]);

  const props_uploadFile = {
    name: "file",
    onChange(info) {
      const { file, fileList } = info;
      var formData = new FormData();
      formData.append("UploadFile", file);
      TeacherTestApi.uploadListQuestionsByTestId(testId, formData)
        .then((resp) => {
          processCreateSuccessResponse(resp);
          reloadListQuestionsByTestId();
        })
        .catch((err) => processErrorResponse(err));
      setFileList([]);
      return false;
    },
    beforeUpload: (file) => {
      setFileList([]);
      return false;
    },
    onRemove: (file) => {
      setFileList([]);
      return false;
    },
    fileList,
  };

  return (
    <>
      <Button onClick={setCreateQuestionModalOpen.bind(this, true)}>
        Tạo câu hỏi mới
      </Button>
      <Upload {...props_uploadFile}>
        <Button style={{ marginLeft: "10px" }}>Load File câu hỏi</Button>
      </Upload>
      <CreateMultipleChoiceModal
        isOpen={isCreateQuestionModalOpen}
        setModalOpen={setCreateQuestionModalOpen}
        onAfterCreated={onAfterCreatedModal}
      />
      <UpdateQuestionn
        onClose={reloadListQuestionsByTestId}
        currentQuestionEdit={getCurrentQuestionEdit}
        isEditModalOpen={isEditModalOpen}
        setEditModalOpen={setEditModalOpen}
      />
      <ListQuestions
        questions={getQuestions}
        onEdit={handleEditQuestion}
        onDelete={handleDeleteQuestion}
      />
    </>
  );
}

export default QuestionManagement;
