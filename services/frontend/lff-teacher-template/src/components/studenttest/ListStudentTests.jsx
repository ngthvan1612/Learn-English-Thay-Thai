import moment from 'moment'
import { Table, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'

function ListStudentTests(props) {

  const fixedStudentTests = props.studenttests.map((studenttest, index) => {
    const temp = {...studenttest};
    temp.order = index + 1;
    temp.UserUsername = temp.student.username;
    temp.TestName = temp.test.name;
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
      title: 'Học viên',
      dataIndex: 'UserUsername',
      key: 'UserUsername'
    },
    {
      title: 'Bài kiểm tra',
      dataIndex: 'TestName',
      key: 'TestName'
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
      <Table rowKey="name" dataSource={fixedStudentTests} columns={columns}/>
    </>
  )
}

export default ListStudentTests
