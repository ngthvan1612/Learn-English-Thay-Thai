import { Form, Input, Modal } from "antd"
import { useEffect } from "react";
import { StudentUserApi } from "../../api";
import { getCurrentUserId, getCurrentUserName } from "../../authorization";
import { processErrorResponse, processUpdateSuccessResponse, toastError } from '../../toast'

const FRM_OLD_PASSWORD_NAME = "frm_old_password";
const FRM_NEW_PASSWORD_NAME = "frm_new_password";
const FRM_RE_NEW_PASSWORD_NAME = "frm_re_new_password";

export default function ChangePasswordModal(props) {
  const setShowing = props.setShowing ?? function(_) { };
  const [formRef] = Form.useForm();
  
  useEffect(() => {
    formRef.resetFields();
  }, [props.isShowing])

  function onSubmit() {
    const oldPassword = formRef.getFieldValue(FRM_OLD_PASSWORD_NAME);
    const newPassword = formRef.getFieldValue(FRM_NEW_PASSWORD_NAME);
    const reNewPassword = formRef.getFieldValue(FRM_RE_NEW_PASSWORD_NAME);
    if (newPassword == null || newPassword == '') {
      toastError("Mật khẩu mới không được trống");
      return;
    }
    if (newPassword !== reNewPassword) {
      toastError("Mật khẩu mới không giống nhau");
      return;
    }
    const currentUserId = getCurrentUserId();
    StudentUserApi.changeMyPassword(currentUserId, oldPassword, newPassword)
      .then(resp => {
        processUpdateSuccessResponse(resp);
        setShowing(false);
      })
      .catch(err => {
        processErrorResponse(err);
      })
  }

  return (
    <>
      <Modal
        title={'Đổi mật khẩu'}
        open={props.isShowing}
        okText={'Lưu'}
        cancelText={'Hủy'}
        onCancel={() => setShowing(false)}
        onOk={onSubmit}>
          <Form
            labelCol={{ span: 8 }}
            form={formRef}
          >
            <Form.Item label={'Mật khẩu cũ'}
              name={FRM_OLD_PASSWORD_NAME}
            >
              <Input.Password/>
            </Form.Item>
            <Form.Item label={'Mật khẩu mới'}
              name={FRM_NEW_PASSWORD_NAME}
            >
              <Input.Password/>
            </Form.Item>
            <Form.Item label={'Nhập lại mật khẩu mới'}
              name={FRM_RE_NEW_PASSWORD_NAME}
            >
              <Input.Password/>
            </Form.Item>
          </Form>
      </Modal>
    </>
  )
}
