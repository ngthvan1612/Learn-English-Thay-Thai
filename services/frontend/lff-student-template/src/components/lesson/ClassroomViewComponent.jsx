import { autocompleteClasses } from "@mui/material";
import { Card, Col, Form, Input, Row, Spin } from "antd";
import { Space, Table, Tag } from "antd";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { StudentClassroomApi, StudentLessonApi } from "../../api";

export default function ClassroomViewComponent(props) {
  const params = useParams();
  const { id: currentClassroomId } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [lessons, setLessons] = useState([]);
  const [classroomInfo, setClassroomInfo] = useState({});

  function fetchListLessons() {
    setIsLoading(true);
    return StudentLessonApi.getAllLessonsByClassId(currentClassroomId)
      .then((response) => {
        const fixedListLessons = response.data.data.map((lesson, index) => {
          const temp = { ...lesson };
          temp.order = index + 1;
          temp.xemBaiGiang = "Xem bài giảng";
          temp.lamKiemTra = "Làm kiểm tra";
          temp.startTime = moment(temp.startTime).format('DD/MM/YYYY')
          return temp;
        });
        setLessons(fixedListLessons);
        setIsLoading(false);
      })
      .catch((error) => {setIsLoading(false)});
  }

  function fetchClassroomInfo() {
    setIsLoading(true);
    return StudentClassroomApi.getClassroomById(currentClassroomId)
      .then((response) => {
        const classroomModel = response.data.data;
        setClassroomInfo({ ...classroomModel });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchClassroomInfo();
    fetchListLessons();
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
      title: "Buổi học",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Ngày",
      dataIndex: "startTime",
      key: "startTime",
      align: "center",
    },
    {
      title: " ",
      dataIndex: "xemBaiGiang",
      key: "xemBaiGiang",
      width: "200px",
      align: "center",
      render: (data, record) => (
        <NavLink
          to={`/student/classroom/${currentClassroomId}/lesson/${record.id}/lecture`}
        >
          {data}
        </NavLink>
      ),
    },
    {
      title: " ",
      dataIndex: "lamKiemTra",
      key: "lamKiemTra",
      width: "200px",
      align: "center",
      render: (data, record) => (
        <NavLink
          to={`/student/classroom/${currentClassroomId}/lesson/${record.id}/test`}
        >
          {data}
        </NavLink>
      ),
    },
  ];

  return (
    <Card title={"Lớp: " + classroomInfo?.name}>
      <Table loading={{
        indicator: <Spin></Spin>,
        spinning: isLoading
      }} rowKey="name" dataSource={lessons} columns={columns} />
    </Card>
  );
}
