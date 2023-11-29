import moment from "moment";
import { Table, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { NavLink, useParams } from "react-router-dom";
function ListLessons(props) {
  const fixedLessons = props.lessons.map((lesson, index) => {
    const temp = { ...lesson };
    temp.lessonId = temp.id;
    temp.order = index + 1;
    temp.startTime = moment(temp.startTime).format("DD/MM/YYYY HH:mm:ss");
    temp.endTime = moment(temp.endTime).format("DD/MM/YYYY HH:mm:ss");
    temp.ClassroomName = temp.class.name;
    return temp;
  });
  const { classId: currentClassId } = useParams();

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
      title: "Tên buổi học",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Trạng thái",
      dataIndex: "isApproved",
      key: "isApproved",
      render: (cell, record) => {
        return (
          <>
            {cell === true ? (
              <a style={{ color: "green", fontWeight: "bold" }}>Đã duyệt</a>
            ) : cell === false ? (
              <a style={{ color: "red", fontWeight: "bold" }}>Không duyệt</a>
            ) : (
              <a>Chưa duyệt</a>
            )}
          </>
        );
      },
    },
    {
      title: "",
      width: "100px",
      key: "action",
      fixed: "right",
      render: (row, record) => (
        <div>
          <Space size="middle">
            <a onClick={() => props.onEdit(row)}>Sửa</a>
            <a onClick={() => props.onDelete(row)}>Xóa</a>
            <NavLink
              end
              to={`/teacher/classroom/${currentClassId}/lesson/${record.lessonId}`}
            >
              Sửa nội dung
            </NavLink>
            <NavLink
              end
              to={`/teacher/classroom/${currentClassId}/lesson/${record.lessonId}/test`}
            >
              List bài kiểm tra
            </NavLink>
          </Space>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table rowKey="name" dataSource={fixedLessons} columns={columns} />
    </>
  );
}

export default ListLessons;
