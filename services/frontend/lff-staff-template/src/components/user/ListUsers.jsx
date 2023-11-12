import moment from 'moment'
import { Table, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'

function ListUsers(props) {

  const fixedUsers = props.users.map((user, index) => {
    const temp = {...user};
    temp.order = index + 1;
    temp.dateOfBirth = moment(temp.dateOfBirth).format("DD/MM/YYYY")
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
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth'
    },
    {
      title: 'Cmnd',
      dataIndex: 'cmnd',
      key: 'cmnd'
    },
    {
      title: '',
      width: '200px',
      key: 'action',
      fixed: 'right',
      render: (row) => (
        <Space size="middle">
          <a onClick={() => props.onEdit(row)}>Sửa</a>
          <a onClick={() => props.onEditPassword(row)}>Đổi mật khẩu</a>
          <a onClick={() => props.onDelete(row)}>Xóa</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table rowKey="name" dataSource={fixedUsers} columns={columns}/>
    </>
  )
}

export default ListUsers
