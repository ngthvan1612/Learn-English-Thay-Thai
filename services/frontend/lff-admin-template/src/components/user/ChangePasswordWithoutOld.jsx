import { Form, Input, Modal } from "antd"
import { useEffect } from "react";
import { AdminUserApi } from "../../api";
import { processErrorResponse, processUpdateSuccessResponse, toastError } from '../../toast'

const FRM_NEW_PASSWORD_NAME = "frm_new_password";

export default function ChangePasswordWithoutOld(props) {
  const setShowing = props.setShowing ?? function(_) { };
  const [formRef] = Form.useForm();

  useEffect(() => {
    formRef.resetFields();
  }, [props.currentUser]);

  function onSubmit() {
    const { id: userId } = props.currentUser;
    const newPassword = formRef.getFieldValue(FRM_NEW_PASSWORD_NAME) ?? '';
    AdminUserApi.changeUserPasswordWithoutOldPassword(userId, newPassword)
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
            <Form.Item label={'Mật khẩu mới'}
              name={FRM_NEW_PASSWORD_NAME}
            >
              <Input.Password/>
            </Form.Item>
          </Form>
      </Modal>
    </>
  )
}
