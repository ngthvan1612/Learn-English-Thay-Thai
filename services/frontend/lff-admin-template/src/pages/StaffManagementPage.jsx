import Card from "antd/lib/card/Card"
import StaffManagement from '../components/user/staff/StaffManagement'

const StaffManagementPage = (props) => {
  return (
    <Card
      title="Quản lý nhân viên"
    >
      <StaffManagement/>
    </Card>
  )
}

export default StaffManagementPage
