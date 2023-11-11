import { Button, Modal, Form, Input, Select, DatePicker, TimePicker } from 'antd'

import React, { useState, useEffect } from 'react'
import { StaffRegisterApi, StaffUserApi, StaffClassroomApi } from '../../api'
import { toastError, toastSuccess } from '../../toast'

import moment from 'moment'
import { useParams } from 'react-router-dom'

function CreateRegister(props) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [getListStudents, setListStudents] = useState([])
  const [getListClasss, setListClasss] = useState([])

  const { classroomId } = useParams()

  const createRegister = (register) => {
    StaffRegisterApi.createRegister(register)
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

  const refreshListStudent = () => {
    StaffUserApi.getAllStudents()
      .then(response => {
        const { data: students } = response.data
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

  useEffect(() => {
    refreshListStudent()
  }, [])

  const handleCreateRegister = () => {
    const register = {
      studentId: form.getFieldValue('studentId'),
      classId: classroomId
    }
    createRegister(register)
  }

  return (
    <>
      <Button shape='round' type="primary" onClick={() => setModalOpen(true)} style={{ marginBottom: '16px' }}>
        Thêm học viên mới
      </Button>
      <Modal
        title="Thêm học viên vào lớp"
        open={isModalOpen}
        onOk={handleCreateRegister}
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
        </Form>
      </Modal>
    </>
  );
}

export default CreateRegister
