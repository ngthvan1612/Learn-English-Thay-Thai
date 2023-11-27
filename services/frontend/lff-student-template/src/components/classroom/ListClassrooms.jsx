import moment from "moment";
import { Table, Space, Spin } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { StudentClassroomApi } from "../../api";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function ListClassrooms(props) {
  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function fetchListClassrooms() {
    setIsLoading(true);
    StudentClassroomApi.getMyClassrooms()
      .then((response) => {
        const { messages, data: classrooms } = response.data;
        const fixedClassrooms = classrooms.map((classroom, index) => {
          const temp = { ...classroom };
          temp.order = index + 1;
          temp.startDate = moment(temp.startDate).format("DD/MM/YYYY");
          temp.CourseName = temp.course.name;
          temp.TeacherName = temp.teacher.fullName;
          return temp;
        });
        setClassrooms(fixedClassrooms);
        setIsLoading(false);
      })
      .catch((error) => {setIsLoading(false)});
  }

  useEffect(() => {
    fetchListClassrooms();
  }, []);

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
      align: 'center',
      render: (data, record) => (
        <NavLink to={`/student/classroom/${record.id}`}>{data}</NavLink>
      ),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      align: 'center',
    },
    {
      title: "Số buổi học",
      dataIndex: "numberOfLessons",
      key: "numberOfLessons",
      align: 'center',
    },
    {
      title: "Khóa học",
      dataIndex: "CourseName",
      key: "CourseName",
      align: 'center',
    },
    {
      title: "Giáo viên",
      dataIndex: "TeacherName",
      key: "TeacherName",
      align: 'center',
    },
  ];

  return (
    <>
      <Table loading={{
        indicator: <Spin></Spin>,
        spinning: isLoading
      }} rowKey="name" dataSource={classrooms} columns={columns} />
    </>
  );
}

export default ListClassrooms;
