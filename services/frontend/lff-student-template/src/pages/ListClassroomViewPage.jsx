import { Card } from "antd"
import ListClassrooms from "../components/classroom/ListClassrooms"
import StudentTimetable from "../components/classroom/StudentTimetable"

const ListClassroomViewPage = (props) => {

  return (
    <Card
      title="Danh sách lớp đang học"
    >
      <ListClassrooms/>
    </Card>
  )
}

export default ListClassroomViewPage
