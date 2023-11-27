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
const StaffInfo = () => {
  const currentStaffInfo = getCurrentUserData()

  return (
    <Card>
      <p>Tên đăng nhập: {currentStaffInfo.username}</p>
      <p>Họ tên: {currentStaffInfo.fullName}</p>
      <p>Email: {currentStaffInfo.email} </p>
      <p>Ngày sinh: {moment(currentStaffInfo.dateOfBirth).format("DD/MM/YYYY")}</p>
      <p>CMND: {currentStaffInfo.cmnd}</p>
      <p>Tạo ngày: {moment(currentStaffInfo.createdAt).format("DD/MM/YYYY")}</p>
      
    </Card>
  );
};
export default StaffInfo;
