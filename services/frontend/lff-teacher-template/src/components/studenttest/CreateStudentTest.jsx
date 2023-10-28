import { Button, Modal, Form, Input, Select, DatePicker, TimePicker } from 'antd'

import React, { useState, useEffect } from 'react'
import { TeacherStudentTestApi, TeacherUserApi, TeacherTestApi } from '../../api'
import { toastError, toastSuccess } from '../../toast'

import moment from 'moment'

function CreateStudentTest(props) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [getListStudents, setListStudents] = useState([])
  const [getListTests, setListTests] = useState([])

  const createStudentTest = (studenttest) => {
    TeacherStudentTestApi.createStudentTest(studenttest)
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
    TeacherUserApi.getAllUsers()
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

  const refreshListTest = () => {
    TeacherTestApi.getAllTests()
      .then(response => {
        const { data:tests } = response.data
        setListTests([
          ...tests.map(record => {
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
    refreshListTest()
  }, [])

  const handleCreateStudentTest = () => {
    const studenttest = {
        studentId: form.getFieldValue('studentId'),
        testId: form.getFieldValue('testId'),
    }
    createStudentTest(studenttest)
  }

  return (
    <>
      <Button shape='round' type="primary" onClick={() => setModalOpen(true)} style={{marginBottom: '16px'}}>
        Thêm học viên kiểm tra [x] mới
      </Button>
      <Modal
        title="Thêm học viên kiểm tra [x] mới"
        open={isModalOpen}
        onOk={handleCreateStudentTest}
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
          <Form.Item
            label="Bài kiểm tra"
            name="testId"
          >
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Tìm kiếm bài kiểm tra"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={getListTests}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateStudentTest
