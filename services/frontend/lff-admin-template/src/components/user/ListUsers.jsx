import { useState, useEffect, useRef } from 'react';
import moment from 'moment'
import { Table, Space, Input, Button } from 'antd'
import { DownOutlined, SearchOutlined } from '@ant-design/icons'

import ChangePasswordWithoutOld from './ChangePasswordWithoutOld'

function ListUsers(props) {

  const fixedUsers = props.users.map((user, index) => {
    const temp = { ...user };
    temp.order = index + 1;
    temp.dateOfBirth = moment(temp.dateOfBirth).format("DD/MM/YYYY")
    return temp;
  });

  const [isChangePasswordModalShowing, setChangePasswordModalShowing] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  function onChangePassword(row) {
    setSelectedUser(row);
    setChangePasswordModalShowing(true);
  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'order',
      key: 'order',
      width: '100px',
      align: 'center',
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      filterMode: 'menu',
      key: 'username'
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
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
      width: '100px',
      key: 'action',
      fixed: 'right',
      render: (row) => (
        <Space size="middle">
          <a onClick={() => onChangePassword(row)}>Đổi mật khẩu</a>
          <a onClick={() => props.onEdit(row)}>Sửa</a>
          <a onClick={() => props.onDelete(row)}>Xóa</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ChangePasswordWithoutOld currentUser={selectedUser} isShowing={isChangePasswordModalShowing} setShowing={setChangePasswordModalShowing}/>
      <Table rowKey="order" dataSource={fixedUsers} columns={columns} />
    </>
  )
}

export default ListUsers
