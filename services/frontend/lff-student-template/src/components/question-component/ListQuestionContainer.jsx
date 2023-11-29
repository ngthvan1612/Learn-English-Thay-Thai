import { Space } from "antd";
import React from "react";

export default function ListQuestionContainer(props) {
  const { children } = props;
  return (
    <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
      {children}
    </Space>
  )
}
