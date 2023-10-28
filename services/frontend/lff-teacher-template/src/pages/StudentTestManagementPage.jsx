import Card from "antd/lib/card/Card"
import StudentTestManagement from "../components/studenttest/StudentTestManagement"

const StudentTestManagementPage = (props) => {

  return (
    <Card
      title="Quản lý học viên kiểm tra [x]"
    >
      <StudentTestManagement/>
    </Card>
  )
}

export default StudentTestManagementPage
