import { Modal } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { AdminUserApi } from "../../api"
import { toastSuccess, toastError } from "../../toast"

const deleteUser = (user, afterDelete) => {
  AdminUserApi.deleteUserById(user.id)
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
    content: (
      <>
        <span>Bạn có chắc muốn xóa người dùng</span> <a>{user.username}</a> <span>không`</span>
      </>
    ),
    okText: 'Xóa',
    cancelText: 'Hủy',
    onOk: handleDeleteUser.bind(this, user, afterDelete),
    autoFocusButton: 'cancel'
  })
}

export {
  ConfirmDeleteUser
}
