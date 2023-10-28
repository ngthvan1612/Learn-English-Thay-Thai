import { Button, Modal, Form, Input, Select, DatePicker, TimePicker } from 'antd'

import React, { useState, useEffect } from 'react'
import { TeacherStudentTestResultApi, TeacherStudentTestApi, TeacherQuestionApi } from '../../api'
import { toastError, toastSuccess } from '../../toast'

import moment from 'moment'

function CreateStudentTestResult(props) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [getListStudenttests, setListStudenttests] = useState([])
  const [getListQuestions, setListQuestions] = useState([])

  const createStudentTestResult = (studenttestresult) => {
    TeacherStudentTestResultApi.createStudentTestResult(studenttestresult)
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

  const refreshListStudenttest = () => {
    TeacherStudentTestApi.getAllStudentTests()
      .then(response => {
        const { data:studenttests } = response.data
        setListStudenttests([
          ...studenttests.map(record => {
            return {
              value: record.id,
              label: record.id
            }
          })
        ])
      })
      .catch(error => {

      })
  }

  const refreshListQuestion = () => {
    TeacherQuestionApi.getAllQuestions()
      .then(response => {
        const { data:questions } = response.data
        setListQuestions([
          ...questions.map(record => {
            return {
              value: record.id,
              label: record.content
            }
          })
        ])
      })
      .catch(error => {

      })
  }


  useEffect(() => {
    refreshListStudenttest()
    refreshListQuestion()
  }, [])

  const handleCreateStudentTestResult = () => {
    const studenttestresult = {
        result: form.getFieldValue('result'),
        studentTestId: form.getFieldValue('studentTestId'),
        questionId: form.getFieldValue('questionId'),
    }
    createStudentTestResult(studenttestresult)
  }

  return (
    <>
      <Button shape='round' type="primary" onClick={() => setModalOpen(true)} style={{marginBottom: '16px'}}>
        Thêm Kết quả học viên KT [x] mới
      </Button>
      <Modal
        title="Thêm Kết quả học viên KT [x] mới"
        open={isModalOpen}
        onOk={handleCreateStudentTestResult}
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
            label="Kết quả [const]"
            name="result"
          >
            <Input autoFocus={true}/>
          </Form.Item>
          <Form.Item
            label="Bài làm học viên"
            name="studentTestId"
          >
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Tìm kiếm bài làm học viên"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={getListStudenttests}
            />
          </Form.Item>
          <Form.Item
            label="Câu hỏi"
            name="questionId"
          >
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Tìm kiếm câu hỏi"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={getListQuestions}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateStudentTestResult
