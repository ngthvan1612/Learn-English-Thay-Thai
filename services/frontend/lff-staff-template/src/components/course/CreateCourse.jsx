import { Button, Modal, Form, Input, Select, DatePicker, TimePicker } from 'antd'

import React, { useState, useEffect } from 'react'
import { StaffCourseApi,  } from '../../api'
import { toastError, toastSuccess } from '../../toast'

import moment from 'moment'

function CreateCourse(props) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [form] = Form.useForm()

  const createCourse = (course) => {
    StaffCourseApi.createCourse(course)
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

  const handleCreateCourse = () => {
    const course = {
        name: form.getFieldValue('name'),
        description: form.getFieldValue('description'),
    }
    createCourse(course)
  }

  return (
    <>
      <Button shape='round' type="primary" onClick={() => setModalOpen(true)} style={{marginBottom: '16px'}}>
        Thêm khóa học mới
      </Button>
      <Modal
        title="Thêm khóa học mới"
        open={isModalOpen}
        onOk={handleCreateCourse}
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

export default CreateCourse
