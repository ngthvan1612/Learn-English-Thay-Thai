import moment from "moment";
import { Table, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { NavLink, useParams } from "react-router-dom";

function ListTests(props) {
  const fixedTests = props.tests.map((test, index) => {
    const temp = { ...test };
    temp.order = index + 1;
    temp.startDate = moment(temp.startDate).format("DD/MM/YYYY HH:mm:ss");
    temp.endDate = moment(temp.endDate).format("DD/MM/YYYY HH:mm:ss");
    temp.LessonName = temp.lesson.name;
    return temp;
  });
  const { classId: currentClassId } = useParams();
  const { lessonId: currentLessonId } = useParams();

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
      title: "Tên bài kiểm tra",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Tg bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Tg kết thúc",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Số lần thực hiện tối đa",
      dataIndex: "numberOfAttempts",
      key: "numberOfAttempts",
    },
    {
      title: "Thời gian làm bài",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Buổi học",
      dataIndex: "LessonName",
      key: "LessonName",
    },
    {
      title: "",
      width: "100px",
      key: "action",
      fixed: "right",
      render: (record, row) => (
        <Space size="middle">
          <a onClick={() => props.onEdit(row)}>Sửa</a>
          <a onClick={() => props.onDelete(row)}>Xóa</a>
          <NavLink
            end
            to={`/teacher/classroom/${currentClassId}/lesson/${currentLessonId}/test/${record.id}/question`}
          >
            Câu hỏi
          </NavLink>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table rowKey="name" dataSource={fixedTests} columns={columns} />
    </>
  );
}

export default ListTests;
