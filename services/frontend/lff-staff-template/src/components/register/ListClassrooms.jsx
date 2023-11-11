import moment from 'moment'
import { Table, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import { StaffClassroomApi } from '../../api';
import { NavLink } from 'react-router-dom';

function ListClassrooms(props) {

  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    StaffClassroomApi.getListClassroomWithNumberOfRegistered()
        .then(resp => {
            console.log(resp.data.data);
            const fixedClassrooms = resp.data.data.map((classroom, index) => {
                classroom.order = index + 1;
                classroom.courseName = classroom?.course?.name;
                classroom.teacherName = classroom?.teacher?.username + ' - ' + classroom?.teacher.fullName;
                return classroom;
            })
            setClassrooms([...fixedClassrooms])
        })
        .catch(err => {

        })
  }, []);

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
      title: 'Tên lớp',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Khóa học',
      dataIndex: 'courseName',
      key: 'courseName'
    },
    {
      title: 'Giáo viên',
      dataIndex: 'teacherName',
      key: 'teacherName'
    },  
    {
      title: 'Số học viên hiện tại',
      dataIndex: 'numberOfStudents',
      key: 'numberOfStudents'
    }, 
    {
      title: '',
      width: '100px',
      key: 'action',
      fixed: 'right',
      render: (cell, row) => (
        <Space size="middle">
          <NavLink to={`/staff/register/classroom/${row.id}`}>Xem</NavLink>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table rowKey="name" dataSource={classrooms} columns={columns}/>
    </>
  )
}

export default ListClassrooms
