import { Modal } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { StaffRegisterApi } from "../../api"
import { toastSuccess, toastError } from "../../toast"

const deleteRegister = (register, afterDelete) => {
  StaffRegisterApi.deleteRegisterById(register.id)
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

const handleDeleteRegister = (register, afterDelete) => {
  deleteRegister(register, afterDelete)
}

const ConfirmDeleteRegister = (register, afterDelete) => {
  Modal.confirm({
    title: 'Cảnh báo',
    icon: <ExclamationCircleOutlined />,
    content: `Bạn có chắc muốn xóa khóa học ${register.name} không`,
    okText: 'Xóa',
    cancelText: 'Hủy',
    onOk: handleDeleteRegister.bind(this, register, afterDelete),
    autoFocusButton: 'cancel'
  })
}

export {
  ConfirmDeleteRegister
}
