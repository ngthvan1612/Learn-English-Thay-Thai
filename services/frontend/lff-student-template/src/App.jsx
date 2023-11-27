import { BrowserRouter, Routes, Route } from "react-router-dom"
import StudentLayout from "./pages/StudentLayout"
import StudentInfoPage from "./pages/StudentInfoPage"
import ListClassroomViewPage from "./pages/ListClassroomViewPage"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/student" exact="true" element={<StudentLayout/>}>
            <Route exact="true" index element={<StudentInfoPage/>}/>
            <Route exact="true" path='time-table' element={<TimeTableViewPagePage/>}/>
            <Route exact="true" path='classroom' element={<ListClassroomViewPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
