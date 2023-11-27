import { Button, Modal, Form, Input, Select, DatePicker } from 'antd'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { StaffUserApi, } from '../../api';
import { processErrorResponse, processUpdateSuccessResponse, toastError, toastSuccess } from '../../toast';

import moment from 'moment'

function UpdatePassword(props) {
  const [form] = Form.useForm()

  const updatePassword = (id, password) => {
    StaffUserApi.updateUserPassword(id, password)
      .then(response => {
        processUpdateSuccessResponse(response);
        props.setEditPasswordModalOpen(false);
        props.onClose();
      })
      .catch(error => {
        processErrorResponse(error);
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

  const handleUpdatePassword = () => {
    const newPassword = form.getFieldValue("password") ?? "";
    const currentUserEdit = props.currentUserEdit;
    const { id: userId } = currentUserEdit;
    updatePassword(userId, newPassword);
  }

  return (
    <>
      <Modal
        title="Cập nhật mật khẩu học viên"
        open={props.isEditPasswordModalOpen}
        onOk={handleUpdatePassword}
        onCancel={() => props.setEditPasswordModalOpen(false)}
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
            label="Mật khẩu"
            name="password"
          >
            <Input.Password autoFocus={true} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UpdatePassword
