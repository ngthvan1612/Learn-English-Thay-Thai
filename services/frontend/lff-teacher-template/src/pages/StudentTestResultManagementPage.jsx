import Card from "antd/lib/card/Card"
import StudentTestResultManagement from "../components/studenttestresult/StudentTestResultManagement"

const StudentTestResultManagementPage = (props) => {

  return (
    <Card
      title="Quản lý Kết quả học viên KT [x]"
    >
      <StudentTestResultManagement/>
    </Card>
  )
}

export default StudentTestResultManagementPage
