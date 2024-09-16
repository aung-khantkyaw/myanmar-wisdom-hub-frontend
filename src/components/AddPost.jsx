import { useState } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Success from "./Success";
import Error from "./Error";

const AddPost = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    user_id: userData.id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData((prevData) => ({
      ...prevData,
      body: data,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7051/api/Posts", formData);
      setSuccess("Post Added: Successful");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Post Added: Failed");
      setSuccess("");
    }
  };

  return (
    <div className="post-form">
      <div className="flex-col bg-base-100 border border-stone-950 p-6 rounded-lg shadow-2xl text-center">
        <div className="flex justify-around items-center">
          <h1 className="text-xl font-bold">Add Post</h1>
          {success && <Success success={success} />}
          {error && <Error error={error} />}
        </div>
        <div className="max-w-2xl mx-auto p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-6">
              <CKEditor
                editor={ClassicEditor}
                data={formData.body}
                onChange={handleEditorChange}
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "blockQuote",
                    "undo",
                    "redo",
                  ],
                }}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
