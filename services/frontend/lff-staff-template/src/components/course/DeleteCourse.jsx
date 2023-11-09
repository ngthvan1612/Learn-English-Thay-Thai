import { Modal } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { StaffCourseApi } from "../../api"
import { toastSuccess, toastError } from "../../toast"

const deleteCourse = (course, afterDelete) => {
  StaffCourseApi.deleteCourseById(course.id)
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

const handleDeleteCourse = (course, afterDelete) => {
  deleteCourse(course, afterDelete)
}

const ConfirmDeleteCourse = (course, afterDelete) => {
  Modal.confirm({
    title: 'Cảnh báo',
    icon: <ExclamationCircleOutlined />,
    content: `Bạn có chắc muốn xóa khóa học ${course.name} không`,
    okText: 'Xóa',
    cancelText: 'Hủy',
    onOk: handleDeleteCourse.bind(this, course, afterDelete),
    autoFocusButton: 'cancel'
  })
}

export {
  ConfirmDeleteCourse
}
