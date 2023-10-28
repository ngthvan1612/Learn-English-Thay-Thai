import { Button, Modal, Form, Input, Select, DatePicker, TimePicker } from 'antd'

import React, { useState, useEffect } from 'react'
import { TeacherLectureApi, TeacherLessonApi } from '../../api'
import { toastError, toastSuccess } from '../../toast'

import moment from 'moment'

function CreateLecture(props) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [getListLessons, setListLessons] = useState([])

  const createLecture = (lecture) => {
    TeacherLectureApi.createLecture(lecture)
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

  const refreshListLesson = () => {
    TeacherLessonApi.getAllLessons()
      .then(response => {
        const { data:lessons } = response.data
        setListLessons([
          ...lessons.map(record => {
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
    refreshListLesson()
  }, [])

  const handleCreateLecture = () => {
    const lecture = {
        name: form.getFieldValue('name'),
        description: form.getFieldValue('description'),
        content: form.getFieldValue('content'),
        lessonId: form.getFieldValue('lessonId'),
    }
    createLecture(lecture)
  }

  return (
    <>
      <Button shape='round' type="primary" onClick={() => setModalOpen(true)} style={{marginBottom: '16px'}}>
        Thêm bài giảng mới
      </Button>
      <Modal
        title="Thêm bài giảng mới"
        open={isModalOpen}
        onOk={handleCreateLecture}
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
            label="Tên bài giảng"
            name="name"
          >
            <Input autoFocus={true}/>
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
          >
            <Input autoFocus={true}/>
          </Form.Item>
          <Form.Item
            label="Nội dung"
            name="content"
          >
            <Input.TextArea rows={10}/>
          </Form.Item>
          <Form.Item
            label="Buổi học"
            name="lessonId"
          >
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Tìm kiếm buổi học"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={getListLessons}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateLecture
