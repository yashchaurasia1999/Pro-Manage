import DashBoard from "./Pages/DashBoard";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SettingPage from "./Pages/SettingPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import TodoDetails from "./Components/TodoDetails";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
        <Routes>
          <Route path="/dashboard" element={<DashBoard/>} />
        </Routes>
        <Routes>
          <Route path="/setting" element={<SettingPage/>} />
        </Routes>
        <Routes>
          <Route path="/analytics" element={<AnalyticsPage/>} />
        </Routes>
        <Routes>
          <Route path="/todo/:id" element={<TodoDetails/>} />
        </Routes>
      
      </BrowserRouter>
      
    </>
  );
}

export default App;
