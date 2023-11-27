import { Button, Modal, Form, Radio, Input, Select, DatePicker, TimePicker } from 'antd'

import React, { useState, useEffect } from 'react'
import { StaffLectureApi, StaffLessonApi } from '../../api'
import { processErrorResponse, processUpdateSuccessResponse, toastError, toastSuccess } from '../../toast'

import RichTextView from './../richtextbox/RichTextView'

import moment from 'moment'
import { useParams } from 'react-router-dom'
import { useForm } from 'antd/es/form/Form'

const OPTION_DUYET = 1;
const OPTION_KHONG_DUYET = 2;

function ViewLecture(props) {
  const [lessonContent, setLessonContent] = useState('');

  const [form] = Form.useForm();

  const lessonId = props.lesson.id;

  useEffect(() => {
    if (lessonId == null || lessonId == '')
      return;
    StaffLessonApi.getLessonById(lessonId)
      .then(response => {
        const lesson = response.data.data;
        setLessonContent(lesson.lessonContent);
        form.setFieldValue("result", lesson.isApproved ? OPTION_DUYET : OPTION_KHONG_DUYET);
        form.setFieldValue("reason", lesson.reason);
      })
    if (form != null) {
      form.resetFields()
    }
  }, [props.lesson])

  function onSaveClicked() {
    const result = form.getFieldValue("result");
    const reason = form.getFieldValue("reason");
    StaffLessonApi.updateApprovalLesson(lessonId, result == OPTION_DUYET, reason)
      .then(resp => {
        processUpdateSuccessResponse(resp);
        props.setShowing(false);
        form.resetFields()
        if (typeof(props.onAfterApproved) === 'function')
          props.onAfterApproved();
      })
      .catch(error => {
        processErrorResponse(error);
      })
  }

  return (
    <>
      <Modal
        title="Duyệt bài giảng"
        open={props.isShowing}
        onCancel={() => props.setShowing(false)}
        onOk={onSaveClicked}
        okText="Lưu"
        cancelText="Hủy"
        width={"71%"}
      >
        <RichTextView content={lessonContent} />
        <Form
          form={form}
        >
          <Form.Item
            name="result"
            defaultValue={1}
            label="Lựa chọn duyệt"
            rules={[{ required: true, message: 'Lựa chọn duyệt hoặc không' }]}
          >
            <Radio.Group>
              <Radio value={OPTION_DUYET}>Duyệt</Radio>
              <Radio value={OPTION_KHONG_DUYET}>Không duyệt</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Lý do:"
            name="reason"
          >
            <Input.TextArea
              rows={8}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ViewLecture
