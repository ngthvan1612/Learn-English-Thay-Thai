import moment from 'moment'
import { Table, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'

function ListLectures(props) {

  const fixedLectures = props.lectures.map((lecture, index) => {
    const temp = {...lecture};
    temp.order = index + 1;
    temp.LessonName = temp.lesson.name;
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
      title: 'Tên bài giảng',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content'
    },
    {
      title: 'Buổi học',
      dataIndex: 'LessonName',
      key: 'LessonName'
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
      <Table rowKey="name" dataSource={fixedLectures} columns={columns}/>
    </>
  )
}

export default ListLectures
