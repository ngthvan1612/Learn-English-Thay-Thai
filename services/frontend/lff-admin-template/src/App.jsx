import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminLayout from "./pages/AdminLayout"
import StaffManagementPage from "./pages/StaffManagementPage"
import StudentManagementPage from "./pages/StudentManagementPage"
import TeacherManagementPage from './pages/TeacherManagementPage'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" exact="true" element={<AdminLayout/>}>
            <Route exact="true" index element={''}/>
            <Route exact="true" path="user/staff" element={<StaffManagementPage/>}/>
            <Route exact="true" path="user/teacher" element={<TeacherManagementPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
