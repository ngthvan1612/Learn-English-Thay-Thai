import { Button, Modal, Form, Input, Select, DatePicker } from 'antd'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { StaffCourseApi, } from '../../api';
import { toastError, toastSuccess } from '../../toast';

import moment from 'moment'

function UpdateCourse(props) {
  const [form] = Form.useForm()

  const updateCourse = (id, course) => {
    StaffCourseApi.updateCourse(id, course)
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
    form.setFieldValue('name', props.currentCourseEdit.name)
    form.setFieldValue('description', props.currentCourseEdit.description)
  }, [props.currentCourseEdit])

  const handleUpdateCourse = () => {
    const course = {
        name: form.getFieldValue('name'),
        description: form.getFieldValue('description'),
    }
    const id = props.currentCourseEdit.id;
    updateCourse(id, course)
  }

  return (
    <>
      <Modal
        title="Cập nhật thông tin khóa học"
        open={props.isEditModalOpen}
        onOk={handleUpdateCourse}
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
            label="Tên khóa học"
            name="name"
          >
            <Input autoFocus={true}/>
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
          >
            <Input.TextArea rows={10}/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UpdateCourse
