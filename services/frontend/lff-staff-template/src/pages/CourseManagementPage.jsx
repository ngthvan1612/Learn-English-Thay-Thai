import Card from "antd/lib/card/Card"
import CourseManagement from "../components/course/CourseManagement"

const CourseManagementPage = (props) => {

  return (
    <Card
      title="Quản lý khóa học"
    >
      <CourseManagement/>
    </Card>
  )
}

export default CourseManagementPage
