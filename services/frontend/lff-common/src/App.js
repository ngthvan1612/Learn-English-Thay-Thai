import { Route, Routes, BrowserRouter } from "react-router-dom";
import CommonLayout from "./pages/Common/CommonLayout";
import Login from "./pages/Auth/Login";
import TrangChu from "./pages/Common/TrangChu";
import "./GlobalStyle.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommonLayout />}>
          <Route index element={<TrangChu />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
