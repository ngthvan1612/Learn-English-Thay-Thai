import moment from 'moment'
import { Table, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'

function ListLessons(props) {

  const fixedLessons = props.lessons.map((lesson, index) => {
    const temp = {...lesson};
    temp.order = index + 1;
    temp.startTime = moment(temp.startTime).format("DD/MM/YYYY HH:mm:ss")
    temp.endTime = moment(temp.endTime).format("DD/MM/YYYY HH:mm:ss")
    temp.ClassroomName = temp.class.name;
    return temp;
  });

  const columns = [
    {
      title: 'STT',
      dataIndex: 'order',
      key: 'order',
      sorter: (a, b) => a.order - b.order,
      width: '100px',
      align: 'center',
    },
    {
      title: 'Tên buổi học',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'startTime',
      key: 'startTime'
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'endTime',
      key: 'endTime'
    },
    {
      title: 'Lớp học',
      dataIndex: 'ClassroomName',
      key: 'ClassroomName'
    },
    {
      title: '',
      width: '100px',
      key: 'action',
      fixed: 'right',
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
      <Table rowKey="name" dataSource={fixedLessons} columns={columns}/>
    </>
  )
}

export default ListLessons
