import { BrowserRouter, Routes, Route } from "react-router-dom";
import TeacherLayout from "./pages/TeacherLayout";
import ClassroomManagementPage from "./pages/ClassroomManagementPage";
import LessonManagementPage from "./pages/LessonManagementPage";
import LessonEditPage from "./components/lesson/LessonEditPage";
// import TestEditPage from "./components/lesson/TestManageMent";
import LectureManagementPage from "./pages/LectureManagementPage";
import TestManagementPage from "./pages/TestManagementPage";
import StudentTestManagementPage from "./pages/StudentTestManagementPage";
import QuestionManagementPage from "./pages/QuestionManagementPage";
import StudentTestResultManagementPage from "./pages/StudentTestResultManagementPage";
import TeacherInfoPage from "./pages/TeacherInfoPage";
import TestManagement from './pages/TestManagementPage'


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/teacher" exact="true" element={<TeacherLayout />}>
            <Route exact="true" index element={<TeacherInfoPage />} />
            <Route
              exact="true"
              path="classroom"
              element={<ClassroomManagementPage />}
            />
            <Route
              exact="true"
              path="classroom/:classId"
              element={<LessonManagementPage />}
            />
            <Route
              exact="true"
              path="/teacher/classroom/:classId/lesson/:lessonId"
              element={<LessonEditPage />}
            />
            <Route
              exact="true"
              path="/teacher/classroom/:classId/lesson/:lessonId/test"
              element={<TestManagement />}
            />
            <Route
              exact="true"
              path="/teacher/classroom/:classId/lesson/:lessonId/test/:testId/question"
              element={<QuestionManagementPage />}
            />
            <Route
              exact="true"
              path="lecture"
              element={<LectureManagementPage />}
            />
            <Route exact="true" path="test" element={<TestManagementPage />} />
            <Route
              exact="true"
              path="studentTest"
              element={<StudentTestManagementPage />}
            />
            <Route
              exact="true"
              path="question"
              element={<QuestionManagementPage />}
            />
            <Route
              exact="true"
              path="studentTestResult"
              element={<StudentTestResultManagementPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
