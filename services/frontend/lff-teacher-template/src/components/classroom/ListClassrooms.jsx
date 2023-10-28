import moment from "moment";
import { Table, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

function ListClassrooms(props) {
  const fixedClassrooms = props.classrooms.map((classroom, index) => {
    const temp = { ...classroom };
    temp.order = index + 1;
    temp.startDate = moment(temp.startDate).format("DD/MM/YYYY");
    temp.CourseName = temp.course.name;
    temp.UserUsername = temp.teacher.username;
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
      title: "Tên lớp",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <NavLink end to={`/teacher/classroom/${record.id}`}>
          {text}
        </NavLink>
      ),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Số buổi học",
      dataIndex: "numberOfLessons",
      key: "numberOfLessons",
    },
    {
      title: "Khóa học",
      dataIndex: "CourseName",
      key: "CourseName",
    },
  ];

  return (
    <>
      <Table rowKey="name" dataSource={fixedClassrooms} columns={columns} />
    </>
  );
}

export default ListClassrooms;
