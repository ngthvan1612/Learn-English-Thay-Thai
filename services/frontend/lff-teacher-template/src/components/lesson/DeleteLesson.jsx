import { Modal } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { TeacherLessonApi } from "../../api"
import { toastSuccess, toastError } from "../../toast"

const deleteLesson = (lesson, afterDelete) => {
  TeacherLessonApi.deleteLessonById(lesson.id)
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

const handleDeleteLesson = (lesson, afterDelete) => {
  deleteLesson(lesson, afterDelete)
}

const ConfirmDeleteLesson = (lesson, afterDelete) => {
  Modal.confirm({
    title: 'Cảnh báo',
    icon: <ExclamationCircleOutlined />,
    content: `Bạn có chắc muốn xóa khóa học ${lesson.name} không`,
    okText: 'Xóa',
    cancelText: 'Hủy',
    onOk: handleDeleteLesson.bind(this, lesson, afterDelete),
    autoFocusButton: 'cancel'
  })
}

export {
  ConfirmDeleteLesson
}
