import { Modal } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { TeacherTestApi } from "../../api"
import { toastSuccess, toastError } from "../../toast"

const deleteTest = (test, afterDelete) => {
  TeacherTestApi.deleteTestById(test.id)
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

const handleDeleteTest = (test, afterDelete) => {
  deleteTest(test, afterDelete)
}

const ConfirmDeleteTest = (test, afterDelete) => {
  Modal.confirm({
    title: 'Cảnh báo',
    icon: <ExclamationCircleOutlined />,
    content: `Bạn có chắc muốn xóa bài test ${test.name} không`,
    okText: 'Xóa',
    cancelText: 'Hủy',
    onOk: handleDeleteTest.bind(this, test, afterDelete),
    autoFocusButton: 'cancel'
  })
}

export {
  ConfirmDeleteTest
}
