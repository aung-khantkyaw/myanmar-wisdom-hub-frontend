import { useState } from "react";
import axios from "axios";

const AddRiddle = () => {
  const [formData, setFormData] = useState({
    riddle: "",
    answer: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7051/api/Riddles/add", formData);
      setSuccess("Riddle added successfully!");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setSuccess("");
    }
  };

  return (
    <div className="proverb-form">
      <div className="flex-col bg-base-100 border border-stone-950 p-6 rounded-lg shadow-2xl text-center">
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-80 mx-auto"
        >
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="riddle"
              className="grow"
              placeholder="Riddle"
              value={formData.riddle}
              onChange={handleChange}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="answer"
              className="grow"
              placeholder="Answer"
              value={formData.answer}
              onChange={handleChange}
              required
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary font-bold text-white"
          >
            စကားပုံထည့်မည်
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRiddle;
