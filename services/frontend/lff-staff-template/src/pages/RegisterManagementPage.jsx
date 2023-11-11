import Card from "antd/lib/card/Card"
import RegisterManagement from "../components/register/RegisterManagement"

const RegisterManagementPage = (props) => {

  return (
    <Card
      title="Quản lý đăng ký khóa học"
    >
      <RegisterManagement/>
    </Card>
  )
}

export default RegisterManagementPage
