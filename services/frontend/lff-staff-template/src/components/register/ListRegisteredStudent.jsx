import moment from 'moment'
import { Table, Space, Button, Modal } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import { StaffClassroomApi, StaffRegisterApi } from '../../api';
import { NavLink, useParams } from 'react-router-dom';
import { processDeleteSuccessResponse, processErrorResponse } from '../../toast';

function ListRegisteredStudent(props) {

  const [students, setStudents] = useState([]);

  const { classroomId } = useParams();

  function reloadListStudents() {
    StaffRegisterApi.getAllRegisteredStudentsByClassroomId(classroomId)
    .then(resp => {
        const fixedStudents = resp.data.data.map((register, index) => {
          register.order = index + 1;
          register.studentUsername = register?.student?.username;
          register.studentFullname = register?.student?.fullName;
          register.studentEmail = register?.student?.email;
          return register;
        });
        setStudents([...fixedStudents])
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    reloadListStudents()
  }, [props.needReload]);

  const [modal] = Modal.useModal();

  function onDeleteStudent(registeredId) {
    Modal.confirm({
      title: 'Cảnh báo',
      content: 'Bạn có chắc muốn xoá học viên này khỏi lớp học không?',
      okText: 'Đồng ý',
      cancelText: 'Huỷ',
      onOk: () => {
        StaffRegisterApi.deleteRegisterById(registeredId)
          .then(resp => {
            processDeleteSuccessResponse(resp);
            reloadListStudents()
          })
          .catch(err => {
            processErrorResponse(err);
          })
      },
      autoFocusButton: 'cancel'
    });
  }

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
      title: 'Tên người dùng',
      dataIndex: 'studentUsername',
      key: 'studentUsername'
    },
    {
      title: 'Họ và tên',
      dataIndex: 'studentFullname',
      key: 'studentFullname'
    },
    {
      title: 'Email',
      dataIndex: 'studentEmail',
      key: 'studentEmail'
    }, 
    {
      title: '',
      width: '100px',
      key: 'action',
      fixed: 'right',
      render: (cell, row) => (
        <Space size="middle">
          <Button onClick={onDeleteStudent.bind(this, row.id)} danger type='primary'>Xoá đăng ký</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table rowKey="name" dataSource={students} columns={columns}/>
    </>
  )
}

export default ListRegisteredStudent
