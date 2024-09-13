import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import JobPostingsPage from "./components/JobPostingsPage";
import TreatmentsPage from "./components/TreatmentsPage";
import ConsultantsPage from "./components/ConsultantsPage";
import DutyDoctorsPage from "./components/DutyDoctorsPage";
import ApplicationsPage from "./components/ApplicationsPage";
import ContactMessagesPage from "./components/ContactMessagesPage";

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
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/messages" element={<ContactMessagesPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
