import { notification } from 'antd';
import { CloseCircleOutlined, CheckOutlined, InfoCircleOutlined } from '@ant-design/icons';

const openNotification = (message, icon) => {
  notification.open({
    message: message,
    className: '',
    style: {
      
    },
    icon: icon
  });
};

const toastError = (message) => {
  openNotification(message, <CloseCircleOutlined style={{ color: '#ff0000' }}/>)
}

const toastSuccess = (message) => {
  openNotification(message, <CheckOutlined style={{ color: '#00ff00' }}/>)
}


const toastInformation = (message) => {
  openNotification(message, <InfoCircleOutlined style={{ color: '#00ff00' }}/>)
}

const handleToast = (response, callback) => {
  if (response.data.messages) {
    for (const message of response.data.messages) {
      callback.call(this, message)
    }
  }
}

const processCreateSuccessResponse = (response) => handleToast(response, toastSuccess)
const processUpdateSuccessResponse = (response) => handleToast(response, toastInformation)
const processDeleteSuccessResponse = (response) => handleToast(response, toastSuccess)

const processErrorResponse = (error) => {
  if (error.response && error.response.data) {
    handleToast(error.response, toastError)
  }
}

export {
  //4 cái này dùng chung
  processCreateSuccessResponse,
  processUpdateSuccessResponse,
  processDeleteSuccessResponse,
  processErrorResponse,
  //một vài trường hợp đặc biệt cần toast riêng
  toastSuccess,
  toastError,
  toastInformation
}
