import { useState } from "react";
import axios from "axios";

function DataEntry() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [form, setForm] = useState({
    respondent_name: "",
    phone: "",
    age: "",
    gender: "",
    location: "",
    feedback: "",
  });

  const submitEntry = async () => {
    try {
      await axios.post(
        "https://padmashree-backend.onrender.com/api/entries/create",
        {
          employee_id: user.id,
          ...form,
        }
      );

      alert("Entry Saved Successfully");

      setForm({
        respondent_name: "",
        phone: "",
        age: "",
        gender: "",
        location: "",
        feedback: "",
      });
    } catch (err) {
      alert("Failed To Save Entry");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-blue-900 mb-2">
          Data Entry Form
        </h1>

        <p className="text-gray-500 mb-6">
          Fill respondent information below
        </p>

        <input
          placeholder="Respondent Name"
          value={form.respondent_name}
          className="w-full border p-3 mb-4 rounded-lg"
          onChange={(e) =>
            setForm({
              ...form,
              respondent_name:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Phone Number"
          value={form.phone}
          className="w-full border p-3 mb-4 rounded-lg"
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />

        <input
          placeholder="Age"
          value={form.age}
          className="w-full border p-3 mb-4 rounded-lg"
          onChange={(e) =>
            setForm({
              ...form,
              age: e.target.value,
            })
          }
        />

        <select
          value={form.gender}
          className="w-full border p-3 mb-4 rounded-lg"
          onChange={(e) =>
            setForm({
              ...form,
              gender: e.target.value,
            })
          }
        >
          <option value="">
            Select Gender
          </option>

          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        <input
          placeholder="Location"
          value={form.location}
          className="w-full border p-3 mb-4 rounded-lg"
          onChange={(e) =>
            setForm({
              ...form,
              location:
                e.target.value,
            })
          }
        />

        <textarea
          placeholder="Feedback"
          rows="4"
          value={form.feedback}
          className="w-full border p-3 mb-6 rounded-lg"
          onChange={(e) =>
            setForm({
              ...form,
              feedback:
                e.target.value,
            })
          }
        />

        <button
          onClick={submitEntry}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white p-3 rounded-lg font-semibold transition"
        >
          Save Entry
        </button>

      </div>

    </div>
  );
}

export default DataEntry;