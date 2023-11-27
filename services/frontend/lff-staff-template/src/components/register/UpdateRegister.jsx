import { Button, Modal, Form, Input, Select, DatePicker } from 'antd'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { StaffRegisterApi, StaffUserApi, StaffClassroomApi} from '../../api';
import { toastError, toastSuccess } from '../../toast';

import moment from 'moment'

function UpdateRegister(props) {
  const [form] = Form.useForm()
  const [getListStudents, setListStudents] = useState([])
  const [getListClasss, setListClasss] = useState([])

  const updateRegister = (id, register) => {
    StaffRegisterApi.updateRegister(id, register)
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

  const refreshListStudent = () => {
    StaffUserApi.getAllUsers()
      .then(response => {
        const { data:students } = response.data
        setListStudents([
          ...students.map(record => {
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

  const refreshListClass = () => {
    StaffClassroomApi.getAllClassrooms()
      .then(response => {
        const { data:classs } = response.data
        setListClasss([
          ...classs.map(record => {
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

  useEffect(() => {
    refreshListStudent()
    refreshListClass()
  }, [])

  useEffect(() => {
    if (props.currentRegisterEdit.student)
      form.setFieldValue('studentId', props.currentRegisterEdit.student.id)
    if (props.currentRegisterEdit.class)
      form.setFieldValue('classId', props.currentRegisterEdit.class.id)
  }, [props.currentRegisterEdit])

  const handleUpdateRegister = () => {
    const register = {
        studentId: form.getFieldValue('studentId'),
        classId: form.getFieldValue('classId'),
    }
    const id = props.currentRegisterEdit.id;
    updateRegister(id, register)
  }

  return (
    <>
      <Modal
        title="Cập nhật thông tin đăng ký khóa học"
        open={props.isEditModalOpen}
        onOk={handleUpdateRegister}
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
            label="Học viên"
            name="studentId"
          >
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Tìm kiếm học viên"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={getListStudents}
            />
          </Form.Item>
          <Form.Item
            label="Lớp học"
            name="classId"
          >
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Tìm kiếm lớp học"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={getListClasss}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UpdateRegister
