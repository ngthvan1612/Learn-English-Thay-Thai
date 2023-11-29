import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  Card,
} from "antd";
import { getCurrentUserData } from "../../authorization";
import moment from "moment";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const StudentInfo = () => {
  const currentStudentInfo = getCurrentUserData() ?? {};

  return (
    <Card>
      <p>Tên đăng nhập: {currentStudentInfo?.username}</p>
      <p>Họ tên: {currentStudentInfo?.fullName}</p>
      <p>Email: {currentStudentInfo?.email} </p>
      <p>Ngày sinh: {moment(currentStudentInfo?.dateOfBirth).format("DD/MM/YYYY")}</p>
      <p>CMND: {currentStudentInfo?.cmnd}</p>
      <p>Tạo ngày: {moment(currentStudentInfo?.createdAt).format("DD/MM/YYYY")}</p>
    </Card>
  );
};
export default StudentInfo;
