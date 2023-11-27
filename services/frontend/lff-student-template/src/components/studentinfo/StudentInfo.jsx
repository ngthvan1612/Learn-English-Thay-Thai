import React from "react";
import { Card } from "antd";
import { getCurrentUserData } from "../../authorization";
import moment from "moment";
const StudentInfo = () => {
  const currentStudentInfo = getCurrentUserData();

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        bordered={false}
        style={{
          width: 300,
          marginLeft: "auto",
          marginRight: "auto",
          fontFamily: "monospace",
          fontSize: "15px",
        }}
      >
        <p>Tên đăng nhập: {currentStudentInfo.username}</p>
        <p>Họ tên: {currentStudentInfo.fullName}</p>
        <p>Email: {currentStudentInfo.email} </p>
        <p>
          Ngày sinh:{" "}
          {moment(currentStudentInfo.dateOfBirth).format("DD/MM/YYYY")}
        </p>
        <p>CMND: {currentStudentInfo.cmnd}</p>
        <p>
          Tạo ngày: {moment(currentStudentInfo.createdAt).format("DD/MM/YYYY")}
        </p>
      </Card>
    </div>
  );
};
export default StudentInfo;
