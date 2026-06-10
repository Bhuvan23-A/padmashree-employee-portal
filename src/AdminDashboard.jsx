import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [employees, setEmployees] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "https://padmashree-backend.onrender.com/api/admin/stats"
      );

      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createEmployee = async () => {
    try {
      await axios.post(
        "https://padmashree-backend.onrender.com/api/employees/create",
        {
          name,
          email,
          password,
        }
      );

      alert("Employee Created Successfully");

      setName("");
      setEmail("");
      setPassword("");

      fetchStats();
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Failed To Create Employee");
      }
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const totalEntries = employees.reduce(
    (sum, emp) => sum + Number(emp.total_entries),
    0
  );

  const topPerformer =
    employees.length > 0
      ? employees.reduce((prev, current) =>
          Number(current.total_entries) >
          Number(prev.total_entries)
            ? current
            : prev
        )
      : null;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <div className="bg-blue-900 text-white p-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-10">

        {/* Add Employee Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">

          <h2 className="text-2xl font-bold mb-5">
            Add New Employee
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Employee Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="email"
              placeholder="Employee Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

          </div>

          <button
            onClick={createEmployee}
            className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Add Employee
          </button>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <p className="text-gray-500">
              Total Employees
            </p>

            <h2 className="text-4xl font-bold text-blue-900 mt-2">
              {employees.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <p className="text-gray-500">
              Total Entries
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              {totalEntries}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <p className="text-gray-500">
              Top Performer
            </p>

            <h2 className="text-xl font-bold text-yellow-600 mt-2">
              {topPerformer
                ? topPerformer.name
                : "N/A"}
            </h2>
          </div>

        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-2xl font-semibold mb-5">
            Employee Productivity
          </h2>

          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-3">
                  Employee
                </th>

                <th className="p-3">
                  Email
                </th>

                <th className="p-3">
                  Entries
                </th>
              </tr>
            </thead>

            <tbody>

              {employees.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-gray-100"
                >
                  <td className="p-3 border">
                    {emp.name}
                  </td>

                  <td className="p-3 border">
                    {emp.email}
                  </td>

                  <td className="p-3 border text-center font-semibold">
                    {emp.total_entries}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;