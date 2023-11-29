import { Button, Modal, Form, Input, Select, DatePicker } from 'antd'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TeacherStudentTestApi, TeacherUserApi, TeacherTestApi} from '../../api';
import { toastError, toastSuccess } from '../../toast';

import moment from 'moment'

function UpdateStudentTest(props) {
  const [form] = Form.useForm()
  const [getListStudents, setListStudents] = useState([])
  const [getListTests, setListTests] = useState([])

  const updateStudentTest = (id, studenttest) => {
    TeacherStudentTestApi.updateStudentTest(id, studenttest)
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

  useEffect(() => {
    if (props.currentStudentTestEdit.student)
      form.setFieldValue('studentId', props.currentStudentTestEdit.student.id)
    if (props.currentStudentTestEdit.test)
      form.setFieldValue('testId', props.currentStudentTestEdit.test.id)
  }, [props.currentStudentTestEdit])

  const handleUpdateStudentTest = () => {
    const studenttest = {
        studentId: form.getFieldValue('studentId'),
        testId: form.getFieldValue('testId'),
    }
    const id = props.currentStudentTestEdit.id;
    updateStudentTest(id, studenttest)
  }

  return (
    <>
      <Modal
        title="Cập nhật thông tin học viên kiểm tra [x]"
        open={props.isEditModalOpen}
        onOk={handleUpdateStudentTest}
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

export default UpdateStudentTest
