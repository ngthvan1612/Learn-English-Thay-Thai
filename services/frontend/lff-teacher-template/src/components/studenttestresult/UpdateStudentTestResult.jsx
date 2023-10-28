import { Button, Modal, Form, Input, Select, DatePicker } from 'antd'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TeacherStudentTestResultApi, TeacherStudentTestApi, TeacherQuestionApi} from '../../api';
import { toastError, toastSuccess } from '../../toast';

import moment from 'moment'

function UpdateStudentTestResult(props) {
  const [form] = Form.useForm()
  const [getListStudenttests, setListStudenttests] = useState([])
  const [getListQuestions, setListQuestions] = useState([])

  const updateStudentTestResult = (id, studenttestresult) => {
    TeacherStudentTestResultApi.updateStudentTestResult(id, studenttestresult)
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

  useEffect(() => {
    form.setFieldValue('result', props.currentStudentTestResultEdit.result)
    if (props.currentStudentTestResultEdit.studentTest)
      form.setFieldValue('studentTestId', props.currentStudentTestResultEdit.studentTest.id)
    if (props.currentStudentTestResultEdit.question)
      form.setFieldValue('questionId', props.currentStudentTestResultEdit.question.id)
  }, [props.currentStudentTestResultEdit])

  const handleUpdateStudentTestResult = () => {
    const studenttestresult = {
        result: form.getFieldValue('result'),
        studentTestId: form.getFieldValue('studentTestId'),
        questionId: form.getFieldValue('questionId'),
    }
    const id = props.currentStudentTestResultEdit.id;
    updateStudentTestResult(id, studenttestresult)
  }

  return (
    <>
      <Modal
        title="Cập nhật thông tin Kết quả học viên KT [x]"
        open={props.isEditModalOpen}
        onOk={handleUpdateStudentTestResult}
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

export default UpdateStudentTestResult
