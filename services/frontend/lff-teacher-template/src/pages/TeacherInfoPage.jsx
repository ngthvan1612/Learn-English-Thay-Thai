import { Card } from "antd"
import React from "react"
import TeacherInfo from "../components/teacherinfo/TeacherInfo"


export default function TeacherInfoPage() {
    return (
      <Card title="Thông tin giảng viên">
        <TeacherInfo />
      </Card>
    );
}
