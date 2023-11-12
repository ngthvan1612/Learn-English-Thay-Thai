import Card from "antd/lib/card/Card"
import StudentManagement from '../components/user/student/StudentManagement'

const StudentManagementPage = (props) => {

  return (
    <Card
      title="Quản lý học viên"
    >
      <StudentManagement/>
    </Card>
  )
}

export default StudentManagementPage
