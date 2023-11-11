import { Card } from "antd"
import React from "react"
import StaffInfo from "../components/staffinfo/StaffInfo"

export default function StudentInfoPage() {
    return (
        <Card
            title='Thông tin nhân viên'
        >
            <StaffInfo/>
        </Card>
    )
}