import { useEffect, useState } from "react";
import axios from "axios";

function DataEntry() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [record, setRecord] = useState(null);

  const [formData, setFormData] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchNextRecord();
  }, []);

  const fetchNextRecord = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://padmashree-backend.onrender.com/api/projects/next-record"
      );

      if (res.data.finished) {
        setRecord(null);
      } else {
        setRecord(res.data);

        const blankForm = {};

        Object.keys(
          res.data.data
        ).forEach((key) => {
          blankForm[key] = "";
        });

        setFormData(blankForm);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const submitEntry = async () => {
    try {
      await axios.post(
        "https://padmashree-backend.onrender.com/api/entries/create",
        {
          employee_id: user.id,
          record_id: record.recordId,
          entered_data: formData,
        }
      );

      alert(
        "Entry Saved Successfully"
      );

      fetchNextRecord();
    } catch (err) {
      console.log(err);

      alert(
        "Failed To Save Entry"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  if (!record) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="bg-white shadow-xl p-10 rounded-xl text-center">

          <h1 className="text-3xl font-bold text-green-600">
            All Work Completed
          </h1>

          <p className="mt-3 text-gray-500">
            No pending records available.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">

      <div className="max-w-5xl mx-auto">

        {/* Record Card */}

        <div className="bg-blue-50 border-2 border-blue-500 rounded-2xl p-8 shadow-lg mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Source Record
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {Object.entries(
              record.data
            ).map(([key, value]) => (
              <div key={key}>

                <span className="font-bold text-gray-700">
                  {key}:
                </span>

                <span className="ml-2 text-gray-600">
                  {value}
                </span>

              </div>
            ))}

          </div>

        </div>

        {/* Entry Form */}

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Enter Data
          </h2>

          {Object.keys(
            formData
          ).map((field) => (
            <div
              key={field}
              className="mb-5"
            >
              <label className="block mb-2 font-semibold">

                {field}

              </label>

              <input
                type="text"
                value={
                  formData[field]
                }
                className="w-full border p-3 rounded-lg"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field]:
                      e.target.value,
                  })
                }
              />
            </div>
          ))}

          <button
            onClick={submitEntry}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-lg font-bold"
          >
            Save & Load Next Record
          </button>

        </div>

      </div>

    </div>
  );
}

export default DataEntry;