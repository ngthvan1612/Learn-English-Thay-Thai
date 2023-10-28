import { Modal } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { TeacherLectureApi } from "../../api"
import { toastSuccess, toastError } from "../../toast"

const deleteLecture = (lecture, afterDelete) => {
  TeacherLectureApi.deleteLectureById(lecture.id)
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

const handleDeleteLecture = (lecture, afterDelete) => {
  deleteLecture(lecture, afterDelete)
}

const ConfirmDeleteLecture = (lecture, afterDelete) => {
  Modal.confirm({
    title: 'Cảnh báo',
    icon: <ExclamationCircleOutlined />,
    content: `Bạn có chắc muốn xóa khóa học ${lecture.name} không`,
    okText: 'Xóa',
    cancelText: 'Hủy',
    onOk: handleDeleteLecture.bind(this, lecture, afterDelete),
    autoFocusButton: 'cancel'
  })
}

export {
  ConfirmDeleteLecture
}
