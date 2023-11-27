import { Card } from "antd"
import React from "react"
import StudentInfo from "../components/studentinfo/StudentInfo"

export default function StudentInfoPage() {
    return (
        <Card
            title='Thông tin học viên'
            style={{
                fontSize: '25px'
            }}
        >
            <StudentInfo/>
        </Card>
    )
}
