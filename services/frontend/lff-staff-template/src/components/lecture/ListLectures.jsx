import moment from 'moment'
import { Table, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'

function ListLectures(props) {

  const fixedLectures = props.lectures.map((lecture, index) => {
    const temp = {...lecture};
    temp.order = index + 1;
    temp.LessonName = temp.name;
    temp.status = 'Chưa duyệt';
    if (temp.isApproved === true)
      temp.status = <a style={{ color: 'green', fontWeight: 'bold' }}>Đã duyệt</a>;
    else if (temp.isApproved === false)
      temp.status = <a style={{ color: 'red', fontWeight: 'bold'}}>Không duyệt</a>;
    if (temp.reason != null)
    {
      if (temp.reason.length > 30)
        temp.reason = temp.reason.substring(0, 30) + ' ...'
    }
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
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Buổi học',
      dataIndex: 'LessonName',
      key: 'LessonName'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Lý do',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: '',
      width: '100px',
      key: 'action',
      fixed: 'right',
      render: (row) => (
        <Space size="middle">
          <a onClick={() => props.onView(row)}>Xem</a>
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
