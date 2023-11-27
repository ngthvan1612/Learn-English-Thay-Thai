import { Card } from "antd";
import StudentTimetable from "../components/classroom/StudentTimetable";

const TimeTableViewPagePage = (props) => {
  return (
    <Card title="Thời khóa biểu">
      <StudentTimetable />
    </Card>
  );
};

export default TimeTableViewPagePage;
