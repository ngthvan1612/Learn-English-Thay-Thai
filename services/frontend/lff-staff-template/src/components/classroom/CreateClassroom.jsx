import { Button, Modal, Form, Input, Select, DatePicker, TimePicker } from 'antd'

import React, { useState, useEffect } from 'react'
import { StaffClassroomApi, StaffCourseApi, StaffUserApi } from '../../api'
import { toastError, toastSuccess } from '../../toast'

import moment from 'moment'

function CreateClassroom(props) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [getListCourses, setListCourses] = useState([])
  const [getListTeachers, setListTeachers] = useState([])

  const createClassroom = (classroom) => {
    StaffClassroomApi.createClassroom(classroom)
      .then(response => {
        const { messages } = response.data
        for (const message of messages) {
          toastSuccess(message)
        }
        setModalOpen(false)
        props.onClose()
      })
      .catch(error => {
        const { messages } = error.response.data
        for (const message of messages) {
          toastError(message)
        }
      })
  }

  const refreshListCourse = () => {
    StaffCourseApi.getAllCourses()
      .then(response => {
        const { data:courses } = response.data
        setListCourses([
          ...courses.map(record => {
            return {
              value: record.id,
              label: record.name
            }
          })
        ])
      })
      .catch(error => {

      })
  }

  const refreshListTeacher = () => {
    StaffUserApi.getAllTeachers()
      .then(response => {
        const { data:teachers } = response.data
        setListTeachers([
          ...teachers.map(record => {
            return {
              value: record.id,
              label: record.username
            }
          })
        ])
      })
      .catch(error => {

      })
  }


  useEffect(() => {
    refreshListCourse()
    refreshListTeacher()
  }, [])

  const handleCreateClassroom = () => {
    const classroom = {
        name: form.getFieldValue('name'),
        startDate: moment(form.getFieldValue('startDate')).utc(true),
        numberOfLessons: parseInt(form.getFieldValue('numberOfLessons')),
        courseId: form.getFieldValue('courseId'),
        teacherId: form.getFieldValue('teacherId'),
    }
    createClassroom(classroom)
  }

  return (
    <>
      <Button shape='round' type="primary" onClick={() => setModalOpen(true)} style={{marginBottom: '16px'}}>
        Thêm Lớp học mới
      </Button>
      <Modal
        title="Thêm Lớp học mới"
        open={isModalOpen}
        onOk={handleCreateClassroom}
        onCancel={() => setModalOpen(false)}
        okText="Tạo"
        cancelText="Hủy"
        afterClose={() => form.resetFields()}
      >
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          labelCol={{ span: 6 }}
        >
          <Form.Item
            label="Tên lớp"
            name="name"
          >
            <Input autoFocus={true}/>
          </Form.Item>
          <Form.Item
            label="Ngày bắt đầu"
            name="startDate"
          >
            <DatePicker autoFocus={true} style={{ width: '100%' }} format="DD/MM/YYYY"/>
          </Form.Item>
          <Form.Item
            label="Số buổi học"
            name="numberOfLessons"
          >
            <Input autoFocus={true}/>
          </Form.Item>
          <Form.Item
            label="Khóa học"
            name="courseId"
          >
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Tìm kiếm khóa học"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={getListCourses}
            />
          </Form.Item>
          <Form.Item
            label="Giáo viên"
            name="teacherId"
          >
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Tìm kiếm giáo viên"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={getListTeachers}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateClassroom
