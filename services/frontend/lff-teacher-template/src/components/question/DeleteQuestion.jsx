import { Modal } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { TeacherQuestionApi } from "../../api"
import { toastSuccess, toastError } from "../../toast"

const deleteQuestion = (question, afterDelete) => {
  TeacherQuestionApi.deleteQuestionById(question.id)
    .then(response => {
      const { messages } = response.data
      for (const message of messages) {
        toastSuccess(message);
      }
      afterDelete()
    })
    .catch(error => {
      const { messages } = error.response.data
      for (const message of messages) {
        toastError(message);
      }
    })
}

const handleDeleteQuestion = (question, afterDelete) => {
  deleteQuestion(question, afterDelete)
}

const ConfirmDeleteQuestion = (question, afterDelete) => {
  Modal.confirm({
    title: 'Cảnh báo',
    icon: <ExclamationCircleOutlined />,
    content: `Bạn có chắc muốn xóa câu hỏi ${question.name} không`,
    okText: 'Xóa',
    cancelText: 'Hủy',
    onOk: handleDeleteQuestion.bind(this, question, afterDelete),
    autoFocusButton: 'cancel'
  })
}

export {
  ConfirmDeleteQuestion
}
