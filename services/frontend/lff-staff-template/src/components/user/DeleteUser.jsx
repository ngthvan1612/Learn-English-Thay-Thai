import { Modal } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { StaffUserApi } from "../../api"
import { toastSuccess, toastError } from "../../toast"

const deleteUser = (user, afterDelete) => {
  StaffUserApi.deleteUserById(user.id)
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

const handleDeleteUser = (user, afterDelete) => {
  deleteUser(user, afterDelete)
}

const ConfirmDeleteUser = (user, afterDelete) => {  
  Modal.confirm({
    title: 'Cảnh báo',
    icon: <ExclamationCircleOutlined />,
    content: `Bạn có chắc muốn xóa học viên ${user.fullName} không`,
    okText: 'Xóa',
    cancelText: 'Hủy',
    onOk: handleDeleteUser.bind(this, user, afterDelete),
    autoFocusButton: 'cancel'
  })
}

export {
  ConfirmDeleteUser
}
