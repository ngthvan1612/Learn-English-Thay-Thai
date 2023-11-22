import { Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { StudentStudentTestApi, StudentTestApi } from "../../api";
import { getCurrentUserId } from "../../authorization";
import { processErrorResponse } from "../../toast";

export default function TestHistoryComponent(props) {
  const { testId, classroomId, lessonId } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const studentId = getCurrentUserId();
    StudentStudentTestApi.getHistoryByStudentIdAndTestIdAsync(studentId, testId)
      .then((resp) => {
        const { histories, totalScore } = resp.data.data;
        setData([
          ...histories.reverse().map((u, order) => {
            u.order = order + 1;
            u.score = u.score.toString() + "/" + totalScore;
            return u;
          }),
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        processErrorResponse(error);
        setIsLoading(false);
      });
  }, [props.testId]);

  const columns = [
    {
      title: "Lần",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Điểm",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Xem lại",

      render: (cell, record) => {
        return (
          <NavLink
            to={`/student/classroom/${classroomId}/lesson/${lessonId}/test/${testId}/${record.studentTestId}/review`}
          >
            Xem lại
          </NavLink>
        );
      },
    },
  ];

  const [data, setData] = useState([]);

  return (
    <>
      <Table
        loading={{
          indicator: <Spin></Spin>,
          spinning: isLoading
        }}
        key={"id"}
        rowKey="name"
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 5,
        }}
      />
    </>
  );
}
