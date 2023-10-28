import { Button, Modal, Form, Input, Select, DatePicker } from 'antd'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TeacherLectureApi, TeacherLessonApi} from '../../api';
import { toastError, toastSuccess } from '../../toast';

import moment from 'moment'

function UpdateLecture(props) {
  const [form] = Form.useForm()
  const [getListLessons, setListLessons] = useState([])

  const updateLecture = (id, lecture) => {
    TeacherLectureApi.updateLecture(id, lecture)
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

  useEffect(() => {
    form.setFieldValue('name', props.currentLectureEdit.name)
    form.setFieldValue('description', props.currentLectureEdit.description)
    form.setFieldValue('content', props.currentLectureEdit.content)
    if (props.currentLectureEdit.lesson)
      form.setFieldValue('lessonId', props.currentLectureEdit.lesson.id)
  }, [props.currentLectureEdit])

  const handleUpdateLecture = () => {
    const lecture = {
        name: form.getFieldValue('name'),
        description: form.getFieldValue('description'),
        content: form.getFieldValue('content'),
        lessonId: form.getFieldValue('lessonId'),
    }
    const id = props.currentLectureEdit.id;
    updateLecture(id, lecture)
  }

  return (
    <>
      <Modal
        title="Cập nhật thông tin bài giảng"
        open={props.isEditModalOpen}
        onOk={handleUpdateLecture}
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

export default UpdateLecture
