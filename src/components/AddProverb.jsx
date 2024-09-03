import { useState } from "react";
import axios from "axios";

const AddProverb = () => {
  const [formData, setFormData] = useState({
    proverb_burmese: "",
    meaning_burmese: "",
    proverb_english: "",
    meaning_english: "",
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
      await axios.post("https://localhost:7051/api/Proverbs/add", formData);
      setSuccess("Proverb added successfully!");
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80 mx-auto">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="proverb_burmese"
              className="grow"
              placeholder="Proverb in Burmese"
              value={formData.proverb_burmese}
              onChange={handleChange}
              required
            />
          </label>
          <label className=" flex items-center gap-2">
            <textarea
              name="meaning_burmese"
              className="textarea textarea-bordered textarea-xs w-full max-w-xs"
              placeholder="Meaning in Burmese"
              value={formData.meaning_burmese}
              onChange={handleChange}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="proverb_english"
              className="grow"
              placeholder="Proverb in English"
              value={formData.proverb_english}
              onChange={handleChange}
              required
            />
          </label>
          <label className=" flex items-center gap-2">
            <textarea
              name="meaning_english"
              className="textarea textarea-bordered textarea-xs w-full max-w-xs"
              placeholder="Meaning in English"
              value={formData.meaning_english}
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

export default AddProverb;