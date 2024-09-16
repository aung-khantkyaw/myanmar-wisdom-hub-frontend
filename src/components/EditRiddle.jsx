import { useState } from "react";
import axios from "axios";
import Success from "./Success";
import Error from "./Error";
import PropTypes from "prop-types";
const EditRiddle = ({ riddle_id, riddle, answer }) => {
  const [formData, setFormData] = useState({
    id: riddle_id,
    riddle: riddle,
    answer: answer,
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
    console.log(formData);
    e.preventDefault();
    try {
      await axios.put(
        `https://localhost:7051/api/Riddles/${riddle_id}`,
        formData
      );
      formData.riddle = "";
      formData.answer = "";
      setSuccess("Riddle Edit successfully!");
      setError("");
    } catch (err) {
      setError(err.response?.message || "An error occurred");
      setSuccess("");
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
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};
EditRiddle.propTypes = {
  riddle_id: PropTypes.number,
  riddle: PropTypes.string,
  answer: PropTypes.string,
};
export default EditRiddle;
