import { Button, Modal, Form, Input, Select, DatePicker } from 'antd'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { StaffClassroomApi, StaffCourseApi, StaffUserApi} from '../../api';
import { toastError, toastSuccess } from '../../toast';

import moment from 'moment'

function UpdateClassroom(props) {
  const [form] = Form.useForm()
  const [getListCourses, setListCourses] = useState([])
  const [getListTeachers, setListTeachers] = useState([])

  const updateClassroom = (id, classroom) => {
    StaffClassroomApi.updateClassroom(id, classroom)
      .then(response => {
        const { messages } = response.data;
        for (const message of messages) {
          toastSuccess(message);
        }
        props.setEditModalOpen(false);
        props.onClose();
      })
      .catch(error => {
        const { messages } = error.response.data;
        for (const message of messages) {
          toastError(message);
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

  useEffect(() => {
    form.setFieldValue('name', props.currentClassroomEdit.name)
    form.setFieldValue('startDate', moment(props.currentClassroomEdit.startDate, "DD/MM/YYYY"))
    form.setFieldValue('numberOfLessons', props.currentClassroomEdit.numberOfLessons)
    if (props.currentClassroomEdit.course)
      form.setFieldValue('courseId', props.currentClassroomEdit.course.id)
    if (props.currentClassroomEdit.teacher)
      form.setFieldValue('teacherId', props.currentClassroomEdit.teacher.id)
  }, [props.currentClassroomEdit])

  const handleUpdateClassroom = () => {
    const classroom = {
        name: form.getFieldValue('name'),
        startDate: moment(form.getFieldValue('startDate')).utc(true),
        numberOfLessons: parseInt(form.getFieldValue('numberOfLessons')),
        courseId: form.getFieldValue('courseId'),
        teacherId: form.getFieldValue('teacherId'),
    }
    const id = props.currentClassroomEdit.id;
    updateClassroom(id, classroom)
  }

  return (
    <>
      <Modal
        title="Cập nhật thông tin Lớp học"
        open={props.isEditModalOpen}
        onOk={handleUpdateClassroom}
        onCancel={() => props.setEditModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
        afterClose={() => form.resetFields()}
      >
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          labelCol={{ span: 5 }}
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

export default UpdateClassroom
