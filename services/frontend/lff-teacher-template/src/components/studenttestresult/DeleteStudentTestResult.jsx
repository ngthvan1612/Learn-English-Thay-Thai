import { Modal } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { TeacherStudentTestResultApi } from "../../api"
import { toastSuccess, toastError } from "../../toast"

const deleteStudentTestResult = (studenttestresult, afterDelete) => {
  TeacherStudentTestResultApi.deleteStudentTestResultById(studenttestresult.id)
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

const handleDeleteStudentTestResult = (studenttestresult, afterDelete) => {
  deleteStudentTestResult(studenttestresult, afterDelete)
}

const ConfirmDeleteStudentTestResult = (studenttestresult, afterDelete) => {
  Modal.confirm({
    title: 'Cảnh báo',
    icon: <ExclamationCircleOutlined />,
    content: `Bạn có chắc muốn xóa khóa học ${studenttestresult.name} không`,
    okText: 'Xóa',
    cancelText: 'Hủy',
    onOk: handleDeleteStudentTestResult.bind(this, studenttestresult, afterDelete),
    autoFocusButton: 'cancel'
  })
}

export {
  ConfirmDeleteStudentTestResult
}
