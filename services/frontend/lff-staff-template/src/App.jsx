import { BrowserRouter, Routes, Route } from "react-router-dom"
import StaffLayout from "./pages/StaffLayout"
import CourseManagementPage from "./pages/CourseManagementPage"
import ClassroomManagementPage from './pages/ClassroomManagementPage'
import LectureManagementPage from './pages/LectureManagementPage'
import RegisterManagementPage from './pages/RegisterManagementPage'
import StudentManagementPage from "./pages/StudentManagementPage"
import StaffInfoPage from "./pages/StaffInfoPage"
import ClassroomRegisterManagementPage from "./pages/ClassroomRegisterManagementPage"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/staff" exact="true" element={<StaffLayout/>}>
            <Route exact="true" index element={<StaffInfoPage/>}/>
            <Route exact="true" path='course' element={<CourseManagementPage/>}/>
            <Route exact="true" path='classroom' element={<ClassroomManagementPage/>}/>
            <Route exact="true" path='lecture' element={<LectureManagementPage/>}/>
            <Route exact="true" path='register' element={<RegisterManagementPage/>}/>
            <Route exact="true" path="user/student" element={<StudentManagementPage/>}/>
            <Route exact="true" path="register/classroom/:classroomId" element={<ClassroomRegisterManagementPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
