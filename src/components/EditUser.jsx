// import Error from "../components/Error";
// import Success from "../components/Success";

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const EditUser = () => {
//   const userData = JSON.parse(localStorage.getItem("userData"));
//   const navigate = useNavigate();
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const [formData, setFormData] = useState({
//     email: userData.email,
//     FirstName: userData.firstName,
//     LastName: userData.lastName,
//     profile_url: userData.profile,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);
//     try {
//       await axios.put(
//         `https://localhost:7051/api/Users/${userData.username}`,
//         formData
//       );
//       setSuccess("User Updated Successfully");
//       navigate(`/${userData.username}`);
//     } catch (err) {
//       console.error("Error response:", err.response.data);
//       setError(err.response.message || "An Error Occur");
//     }
//   };

//   return (
//     <div className="flex-col bg-base-100 border border-stone-950 p-6 rounded-lg shadow-2xl text-center">
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col gap-4 w-80 mx-auto"
//       >
//         {success && <Success success={success} />}
//         {error && <Error error={error} />}
//         <label className="input input-bordered flex items-center gap-2">
//           <input
//             type="text"
//             className="grow"
//             placeholder="Profile url"
//             name="profile_url"
//             value={formData.profile_url}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label className="input input-bordered flex items-center gap-2">
//           <input
//             type="email"
//             className="grow"
//             placeholder="Email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label className="input input-bordered flex items-center gap-2">
//           <input
//             type="text"
//             className="grow"
//             placeholder="Firstname"
//             name="first_name"
//             value={formData.FirstName}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label className="input input-bordered flex items-center gap-2">
//           <input
//             type="text"
//             className="grow"
//             placeholder="Lastname"
//             name="last_name"
//             value={formData.LastName}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <button type="submit" className="btn btn-primary font-bold text-white">
//           Edit User Data
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditUser;

import Success from "../components/Success";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: userData.email,
    FirstName: userData.firstName,
    LastName: userData.lastName,
    profile_url: userData.profile,
    profileImage: null, // For the image upload
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profileImage: e.target.files[0], // Store the file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append form data
    data.append("email", formData.email);
    data.append("FirstName", formData.FirstName);
    data.append("LastName", formData.LastName);
    data.append("profile_url", formData.profile_url);

    // Append the image file if it exists
    if (formData.profileImage) {
      data.append("ProfileImage", formData.profileImage);
    }

    try {
      await axios.put(
        `https://localhost:7051/api/Users/${userData.username}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type for file upload
          },
        }
      );
      setSuccess("User Updated Successfully");
      navigate(`/${userData.username}`);
    } catch (err) {
      console.error("Error response:", err.response.data);
      setError(err.response.data.message || "An Error Occurred");
    }
  };

  return (
    <div className="flex-col bg-base-100 border border-stone-950 p-6 rounded-lg shadow-2xl text-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80 mx-auto"
      >
        {success && <Success success={success} />}
        {error && <span className="text-red-500">{error}</span>}
        <input
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          accept="image/*" // Accept only image files
          onChange={handleFileChange}
          required
        />
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="email"
            className="grow"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Firstname"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Lastname"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="btn btn-primary font-bold text-white">
          Edit User Data
        </button>
      </form>
    </div>
  );
};

export default EditUser;
