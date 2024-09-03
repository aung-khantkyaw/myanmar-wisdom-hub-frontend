import Navbar from "../components/Navbar";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    profile_url: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "https://localhost:7051/api/Users/register",
        formData
      );
      setSuccess(response.data.message);
      setError("");
      navigate("/login");
    } catch (err) {
      console.error("Error response:", err.response);
      setError(err.response.data.message || "An error occurred");
      setSuccess("");
    }
  };

  return (
    <div className="w-full relative">
      <div className="w-full fixed top-0 z-10">
        <Navbar />
      </div>
      <div
        className="hero min-h-screen bg-base-300"
        // style={{
        //   backgroundImage: `url(${bgImage})`,
        // }}
      >
        <div className="flex-col bg-base-100 p-6 rounded-lg shadow-2xl text-center">
          <h2 className="font-bold text-2xl mb-6">Create New Account</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-80
        "
          >
            {success && <p style={{ color: "green" }}>{success}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Profile url"
                name="profile_url"
                onChange={handleChange}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="email"
                className="grow"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="password"
                className="grow"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Firstname"
                name="first_name"
                onChange={handleChange}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Lastname"
                name="last_name"
                onChange={handleChange}
                required
              />
            </label>
            <button
              type="submit"
              className="btn btn-primary font-bold text-white"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
