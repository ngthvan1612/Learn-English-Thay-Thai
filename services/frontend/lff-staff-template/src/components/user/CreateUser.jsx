import { Button, Modal, Form, Input, Select, DatePicker, TimePicker } from 'antd'

import React, { useState, useEffect } from 'react'
import { StaffUserApi,  } from '../../api'
import { toastError, toastSuccess } from '../../toast'

import moment from 'moment'
import { ROLE_STUDENT } from '../../authorization'

function CreateUser(props) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [form] = Form.useForm()

  const createUser = (user) => {
    StaffUserApi.createStudent(user)
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


  useEffect(() => {
  }, [])

  const handleCreateUser = () => {
    const user = {
        username: form.getFieldValue('username'),
        fullName: form.getFieldValue('fullName'),
        password: form.getFieldValue('password'),
        email: form.getFieldValue('email'),
        dateOfBirth: moment(form.getFieldValue('dateOfBirth')).utc(true),
        cmnd: form.getFieldValue('cmnd'),
        role: form.getFieldValue('role'),
    }
    createUser(user)
  }

  return (
    <>
      <Button shape='round' type="primary" onClick={() => setModalOpen(true)} style={{marginBottom: '16px'}}>
        Thêm học viên mới
      </Button>
      <Modal
        title="Thêm học viên mới"
        open={isModalOpen}
        onOk={handleCreateUser}
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
            label="Tên đăng nhập"
            name="username"
          >
            <Input autoFocus={true}/>
          </Form.Item>
          <Form.Item
            label="Họ và tên"
            name="fullName"
          >
            <Input autoFocus={true}/>
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
          >
            <Input autoFocus={true}/>
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
          >
            <Input autoFocus={true}/>
          </Form.Item>
          <Form.Item
            label="Ngày sinh"
            name="dateOfBirth"
          >
            <DatePicker autoFocus={true} style={{ width: '100%' }} format="DD/MM/YYYY"/>
          </Form.Item>
          <Form.Item
            label="Cmnd"
            name="cmnd"
          >
            <Input autoFocus={true}/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateUser
