import { BrowserRouter, Routes, Route } from "react-router-dom"
import StudentLayout from "./pages/StudentLayout"
import StudentInfoPage from "./pages/StudentInfoPage"
import ListClassroomViewPage from "./pages/ListClassroomViewPage"
import ClassroomViewPage from "./pages/ClassroomViewPage"
import LessonViewPage from "./pages/LessonViewPage"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/student" exact="true" element={<StudentLayout/>}>
            <Route exact="true" index element={<StudentInfoPage/>}/>
            <Route exact="true" path='time-table' element={<TimeTableViewPagePage/>}/>
            <Route exact="true" path='classroom' element={<ListClassroomViewPage/>}/>
            <Route exact="true" path='classroom/:id' element={<ClassroomViewPage/>}/>
            <Route exact="true" path='classroom/:classroomId/lesson/:lessonId/lecture' element={<LessonViewPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
