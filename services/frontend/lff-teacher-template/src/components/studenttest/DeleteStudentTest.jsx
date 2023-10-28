import { Modal } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { TeacherStudentTestApi } from "../../api"
import { toastSuccess, toastError } from "../../toast"

const deleteStudentTest = (studenttest, afterDelete) => {
  TeacherStudentTestApi.deleteStudentTestById(studenttest.id)
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

const handleDeleteStudentTest = (studenttest, afterDelete) => {
  deleteStudentTest(studenttest, afterDelete)
}

const ConfirmDeleteStudentTest = (studenttest, afterDelete) => {
  Modal.confirm({
    title: 'Cảnh báo',
    icon: <ExclamationCircleOutlined />,
    content: `Bạn có chắc muốn xóa khóa học ${studenttest.name} không`,
    okText: 'Xóa',
    cancelText: 'Hủy',
    onOk: handleDeleteStudentTest.bind(this, studenttest, afterDelete),
    autoFocusButton: 'cancel'
  })
}

export {
  ConfirmDeleteStudentTest
}
