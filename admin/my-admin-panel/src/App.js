import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import JobPostingsPage from './components/JobPostingsPage';
import TreatmentsPage from "./components/TreatmentsPage";
import ConsultantsPage from "./components/ConsultantsPage";
import DutyDoctorsPage from "./components/DutyDoctorsPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Login />} />
          <Route path="/dashboard" element={<Sidebar />} />
          <Route path="/jobpostings" element={<JobPostingsPage />} />
          <Route path="/treatments" element={<TreatmentsPage />} />
          <Route path="/consultants" element={<ConsultantsPage />} />
          <Route path="/duty-doctors" element={<DutyDoctorsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
