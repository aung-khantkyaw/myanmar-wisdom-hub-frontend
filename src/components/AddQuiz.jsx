import { useState } from "react";
import axios from "axios";
import Success from "./Success";
import Error from "./Error";

const AddQuiz = () => {
  const [formData, setFormData] = useState({
    question: "",
    option_one: "",
    option_two: "",
    option_three: "",
    option_four: "",
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
      await axios.post("https://localhost:7051/api/Quizs/add", formData);
      setSuccess("Quiz added successfully!");
      setFormData({
        question: "",
        option_one: "",
        option_two: "",
        option_three: "",
        option_four: "",
        answer: "",
      });
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
              name="question"
              className="grow"
              placeholder="Question"
              value={formData.question}
              onChange={handleChange}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="option_one"
              className="grow"
              placeholder="Option One"
              value={formData.option_one}
              onChange={handleChange}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="option_two"
              className="grow"
              placeholder="Option Two"
              value={formData.option_two}
              onChange={handleChange}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="option_three"
              className="grow"
              placeholder="Option Three"
              value={formData.option_three}
              onChange={handleChange}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="option_four"
              className="grow"
              placeholder="Option Four"
              value={formData.option_four}
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

export default AddQuiz;
