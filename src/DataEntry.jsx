import {
  useCallback,
  useEffect,
  useState,
} from "react";
import axios from "axios";

function DataEntry() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [record, setRecord] = useState(null);

  const [formData, setFormData] =
    useState({});

  const [errors, setErrors] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const fetchNextRecord = useCallback(async () => {
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
        setErrors({});
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNextRecord();
  }, [fetchNextRecord]);

  const normalizeValue = (value) =>
    String(value ?? "").trim();

  const validateForm = () => {
    const nextErrors = {};

    Object.entries(record.data).forEach(
      ([field, expectedValue]) => {
        const enteredValue = normalizeValue(
          formData[field]
        );

        if (!enteredValue) {
          nextErrors[field] =
            "This field is required.";
          return;
        }

        if (
          enteredValue !==
          normalizeValue(expectedValue)
        ) {
          nextErrors[field] =
            "This value does not match the source record.";
        }
      }
    );

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length === 0
    );
  };

  const submitEntry = async () => {
    if (!validateForm()) {
      alert(
        "Please fill every column correctly before saving."
      );
      return;
    }

    try {
      setSaving(true);

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

      setErrors(
        err.response?.data?.errors || {}
      );

      alert(
        err.response?.data?.message ||
          "Failed To Save Entry"
      );
    } finally {
      setSaving(false);
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
                className={`w-full border p-3 rounded-lg ${
                  errors[field]
                    ? "border-red-500 bg-red-50"
                    : ""
                }`}
                aria-invalid={
                  errors[field]
                    ? "true"
                    : "false"
                }
                onChange={(e) => {
                  const value =
                    e.target.value;

                  setFormData({
                    ...formData,
                    [field]: value,
                  });

                  if (errors[field]) {
                    setErrors({
                      ...errors,
                      [field]: "",
                    });
                  }
                }}
              />

              {errors[field] && (
                <p className="mt-2 text-sm text-red-600">
                  {errors[field]}
                </p>
              )}
            </div>
          ))}

          <button
            onClick={submitEntry}
            disabled={saving}
            className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-gray-400 text-white py-3 rounded-lg font-bold"
          >
            {saving
              ? "Saving..."
              : "Save & Load Next Record"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default DataEntry;
