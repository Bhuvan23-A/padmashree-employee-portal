import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import EmployeeDashboard from "./EmployeeDashboard";
import DataEntry from "./DataEntry";
import AdminDashboard from "./AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<EmployeeDashboard />} />
        <Route path="/data-entry" element={<DataEntry />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;