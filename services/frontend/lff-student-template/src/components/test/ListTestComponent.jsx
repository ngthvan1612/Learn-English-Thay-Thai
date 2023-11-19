import moment from "moment";
import React, { useEffect, useState } from "react";
import { StudentStudentTestApi, StudentTestApi } from "../../api";
import { Button, Modal, Spin, Table } from "antd";
import { NavLink } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import TestHistoryComponent from "./TestHistoryComponent";
import { getCurrentUserId } from "../../authorization";
import { processErrorResponse } from "../../toast";

export default function ListTestComponent(props) {
  const params = useParams();
  const { classroomId, lessonId } = params;
  const [tests, setTests] = useState([]);
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  function fetchListTests() {
    setIsLoading(true);
    StudentTestApi.getTestsByLessonId(lessonId)
      .then((response) => {
        const { messages, data: tests } = response.data;
        StudentStudentTestApi.getStudentTestIsRunning(getCurrentUserId())
          .then((resp) => {
            const currentRunningTest = resp.data.data.map((u) => {
              return {
                studentTestId: u.id,
                testId: u.test.id,
              };
            });
            const fixedTests = tests.map((test, index) => {
              const temp = { ...test };
              temp.order = index + 1;
              if (temp.numberOfAttempts < 0) {
                temp.numberOfAttempts = "Không giới hạn";
              }
              temp.time = temp.time + " phút";
              const startDate = moment(temp.startDate);
              const endDate = moment(temp.endDate);
              temp.startDate = moment(temp.startDate).format(
                "HH:mm DD/MM/YYYY"
              );
              temp.endDate = moment(temp.endDate).format("HH:mm DD/MM/YYYY");
              const now = moment(Date.now()).utc();
              if (now < startDate) temp.status = <a>Chưa bắt đầu</a>;
              else if (now <= endDate) temp.status = <a>Đang diễn ra</a>;
              else temp.status = <a>Đã kết thúc</a>;
              if (currentRunningTest.some((u) => u.testId == temp.id)) {
                temp.isRunning = true;
                temp.studentTestId = currentRunningTest.find(
                  (u) => u.testId == temp.id
                ).studentTestId;
              }
              return temp;
            });
            const sortedTests = fixedTests.sort((a, b) => {
              if (a.endDate > b.endDate) return -1;
              if (a.endDate < b.endDate) return +1;
              return 0;
            });
            setTests(sortedTests);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function startRunningTest(testId) {
    StudentStudentTestApi.startRunningTest(getCurrentUserId(), testId)
      .then((resp) => {
        history({
          pathname: `/student/classroom/${classroomId}/lesson/${lessonId}/test/${testId}/${resp.data.data.id}/attempt`,
        });
      })
      .catch((err) => {
        console.log(err);
        processErrorResponse(err);
      });
  }

  useEffect(() => {
    fetchListTests();
  }, []);

  const columns = [
    {
      title: "Tên bài kiểm tra",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      align: "center",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "Số lần tối đa",
      dataIndex: "numberOfAttempts",
      key: "numberOfAttempts",
      align: "center",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      align: "center",
    },
    {
      title: "",
      align: "center",
      render: (data, record) => (
        <>
          {record.isRunning ? (
            <NavLink
              to={`/student/classroom/${classroomId}/lesson/${lessonId}/test/${record.id}/${record.studentTestId}/attempt`}
            >
              <Button>Làm tiếp</Button>
            </NavLink>
          ) : (
            <Button onClick={startRunningTest.bind(this, record.id)}>
              Bắt đầu làm bài
            </Button>
          )}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "xemLichSu",
      key: "xemLichSu",
      render: (_, record) => (
        <a
          onClick={() => {
            setSelectedTestId(record.id);
            showModal();
          }}
        >
          Xem lịch sử
        </a>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Lịch sử làm bài"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TestHistoryComponent
          testId={selectedTestId}
          classroomId={classroomId}
          lessonId={lessonId}
        />
      </Modal>
      <Table loading={
        {
          indicator: <Spin></Spin>,
          spinning: isLoading
        }
      } rowKey="name" dataSource={tests} columns={columns} />
    </>
  );
}
