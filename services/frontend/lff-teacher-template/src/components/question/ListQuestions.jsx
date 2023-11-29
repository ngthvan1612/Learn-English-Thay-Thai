import moment from "moment";
import { Table, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";


function ListQuestions(props) {
  const fixedQuestions = props.questions.map((question, index) => {
    const temp = { ...question };
    temp.order = index + 1;
    temp.TestName = temp.test.name;
    temp.questionTitle = JSON.parse(temp.content).question.raw;
    return temp;
  });

  const columns = [
    {
      title: "STT",
      dataIndex: "order",
      key: "order",
      sorter: (a, b) => a.order - b.order,
      width: "100px",
      align: "center",
    },
    {
      title: "Nội dung",
      dataIndex: "questionTitle",
      key: "questionTitle",
    },
    {
      title: "",
      width: "100px",
      key: "action",
      fixed: "right",
      render: (row) => (
        <Space size="middle">
          <a onClick={() => props.onEdit(row)}>Sửa</a>
          <a onClick={() => props.onDelete(row)}>Xóa</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table rowKey="order" dataSource={fixedQuestions} columns={columns} />
    </>
  );
}

export default ListQuestions;
