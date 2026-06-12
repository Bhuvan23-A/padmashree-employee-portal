import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeDashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [totalEntries, setTotalEntries] =
    useState(0);

  const [pendingRecords, setPendingRecords] =
    useState(0);

  useEffect(() => {
    fetchMyStats();
    fetchPendingWork();
  }, []);

  const fetchMyStats = async () => {
    try {
      const res = await axios.get(
        `https://padmashree-backend.onrender.com/api/entries/count/${user.id}`
      );

      setTotalEntries(
        res.data.total_entries
      );
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPendingWork = async () => {
    try {
      const res = await axios.get(
        "https://padmashree-backend.onrender.com/api/projects/next-record"
      );

      if (res.data.finished) {
        setPendingRecords(0);
      } else {
        setPendingRecords(1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-blue-900 text-white px-8 py-5 flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Employee Dashboard
          </h1>

          <p className="text-blue-200">
            Data Entry Executive Panel
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      <div className="max-w-6xl mx-auto py-10 px-4">

        {/* Welcome Card */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <h2 className="text-3xl font-bold">
            Welcome, {user?.name}
          </h2>

          <p className="text-gray-500 mt-2">
            Complete assigned data entry projects
            and maintain productivity.
          </p>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white shadow-lg rounded-xl p-6">

            <h3 className="text-gray-500">
              Employee
            </h3>

            <p className="text-2xl font-bold mt-2">
              {user?.name}
            </p>

          </div>

          <div className="bg-white shadow-lg rounded-xl p-6">

            <h3 className="text-gray-500">
              Total Entries Completed
            </h3>

            <p className="text-4xl font-bold text-green-600 mt-2">
              {totalEntries}
            </p>

          </div>

          <div className="bg-white shadow-lg rounded-xl p-6">

            <h3 className="text-gray-500">
              Pending Work
            </h3>

            <p className="text-4xl font-bold text-orange-500 mt-2">
              {pendingRecords}
            </p>

          </div>

        </div>

        {/* Work Panel */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-3">
            Work Queue
          </h2>

          <p className="text-gray-500 mb-6">
            Start entering project data assigned
            by the administrator.
          </p>

          <Link
            to="/data-entry"
            className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-lg inline-block"
          >
            Start Data Entry
          </Link>

        </div>

      </div>

    </div>
  );
}

export default EmployeeDashboard;