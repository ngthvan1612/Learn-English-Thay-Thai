import Card from "antd/lib/card/Card"
import TeacherManagement from "../components/user/teacher/TeacherManagement"
import UserManagement from "../components/user/UserManagement"

const TeacherManagementPage = (props) => {

  return (
    <Card
      title="Quản lý giảng viên"
    >
      <TeacherManagement/>
    </Card>
  )
}

export default TeacherManagementPage
