import { Button, Modal, Form, Input, Select, DatePicker } from 'antd'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { StaffUserApi, } from '../../api';
import { toastError, toastSuccess } from '../../toast';

import moment from 'moment'

function UpdateUser(props) {
  const [form] = Form.useForm()

  const updateUser = (id, user) => {
    StaffUserApi.updateUser(id, user)
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

  useEffect(() => {
  }, [])

  useEffect(() => {
    form.setFieldValue('username', props.currentUserEdit.username)
    form.setFieldValue('fullName', props.currentUserEdit.fullName)
    form.setFieldValue('password', props.currentUserEdit.password)
    form.setFieldValue('email', props.currentUserEdit.email)
    form.setFieldValue('dateOfBirth', moment(props.currentUserEdit.dateOfBirth, "DD/MM/YYYY"))
    form.setFieldValue('cmnd', props.currentUserEdit.cmnd)
    form.setFieldValue('role', props.currentUserEdit.role)
  }, [props.currentUserEdit])

  const handleUpdateUser = () => {
    const user = {
        username: form.getFieldValue('username'),
        fullName: form.getFieldValue('fullName'),
        password: form.getFieldValue('password'),
        email: form.getFieldValue('email'),
        dateOfBirth: moment(form.getFieldValue('dateOfBirth')).utc(true),
        cmnd: form.getFieldValue('cmnd'),
        role: form.getFieldValue('role'),
    }
    const id = props.currentUserEdit.id;
    updateUser(id, user)
  }

  return (
    <>
      <Modal
        title="Cập nhật thông tin học viên"
        open={props.isEditModalOpen}
        onOk={handleUpdateUser}
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
            label="Tên đăng nhập"
            name="username"
          >
            <Input autoFocus={true} readOnly={true}/>
          </Form.Item>
          <Form.Item
            label="Họ và tên"
            name="fullName"
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

export default UpdateUser
