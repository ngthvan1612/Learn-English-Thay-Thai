import Card from "antd/lib/card/Card"
import LectureManagement from "../components/lecture/LectureManagement"

const LectureManagementPage = (props) => {

  return (
    <Card
      title="Quản lý bài giảng"
    >
      <LectureManagement/>
    </Card>
  )
}

export default LectureManagementPage
