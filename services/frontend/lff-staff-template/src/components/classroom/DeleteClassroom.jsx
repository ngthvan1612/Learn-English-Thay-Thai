import { Modal } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { StaffClassroomApi } from "../../api"
import { toastSuccess, toastError } from "../../toast"

const deleteClassroom = (classroom, afterDelete) => {
  StaffClassroomApi.deleteClassroomById(classroom.id)
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

const handleDeleteClassroom = (classroom, afterDelete) => {
  deleteClassroom(classroom, afterDelete)
}

const ConfirmDeleteClassroom = (classroom, afterDelete) => {
  Modal.confirm({
    title: 'Cảnh báo',
    icon: <ExclamationCircleOutlined />,
    content: `Bạn có chắc muốn xóa khóa học ${classroom.name} không`,
    okText: 'Xóa',
    cancelText: 'Hủy',
    onOk: handleDeleteClassroom.bind(this, classroom, afterDelete),
    autoFocusButton: 'cancel'
  })
}

export {
  ConfirmDeleteClassroom
}
