import { useState } from "react";
import axios from "axios";
import Success from "./Success";
import Error from "./Error";

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
      formData.proverb_burmese = "";
      formData.meaning_burmese = "";
      formData.proverb_english = "";
      formData.meaning_english = "";
      setSuccess("Proverb added successfully!");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setSuccess("");
    }
  };

  return (
    <div className="proverb-form">
      <div className="flex-col bg-base-100 border border-stone-950 p-6 rounded-lg shadow-2xl text-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-80 mx-auto"
        >
          {success && <Success success={success} />}
          {error && <Error error={error} />}
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
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProverb;
