import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeDashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [totalEntries, setTotalEntries] =
    useState(0);

  useEffect(() => {
    fetchMyStats();
  }, []);

  const fetchMyStats = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/entries/count/${user.id}`
      );

      setTotalEntries(
        res.data.total_entries
      );
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <div className="bg-blue-900 text-white p-5 flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Employee Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      <div className="max-w-5xl mx-auto mt-10">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-2">
            Welcome {user?.name}
          </h2>

          <p className="text-gray-600 mb-6">
            Data Entry Executive
          </p>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-blue-100 p-6 rounded-lg">
              <h3 className="font-bold text-lg">
                Employee Name
              </h3>

              <p className="text-xl mt-2">
                {user?.name}
              </p>
            </div>

            <div className="bg-green-100 p-6 rounded-lg">
              <h3 className="font-bold text-lg">
                Email
              </h3>

              <p className="text-lg mt-2">
                {user?.email}
              </p>
            </div>

            <div className="bg-yellow-100 p-6 rounded-lg">
              <h3 className="font-bold text-lg">
                My Total Entries
              </h3>

              <p className="text-3xl font-bold mt-2">
                {totalEntries}
              </p>
            </div>

          </div>

          <Link
            to="/data-entry"
            className="inline-block mt-8 bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg"
          >
            Create New Entry
          </Link>

        </div>

      </div>

    </div>
  );
}

export default EmployeeDashboard;