import { useState } from "react";
import axios from "axios";
import Success from "./Success";
import Error from "./Error";
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
      formData.riddle = "";
      formData.answer = "";
      setSuccess("Riddle added successfully!");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="riddle-form">
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
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRiddle;
