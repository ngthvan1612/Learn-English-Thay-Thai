import Card from "antd/lib/card/Card"
import LessonManagement from "../components/lesson/LessonManagement"

const LessonManagementPage = (props) => {

  return (
    <Card
      title="Quản lý buổi học"
    >
      <LessonManagement/>
    </Card>
  )
}

export default LessonManagementPage
