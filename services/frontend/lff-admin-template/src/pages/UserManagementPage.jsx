import Card from "antd/lib/card/Card"
import UserManagement from "../components/user/UserManagement"

const UserManagementPage = (props) => {

  return (
    <Card
      title="Quản lý người dùng"
    >
      <UserManagement/>
    </Card>
  )
}

export default UserManagementPage
