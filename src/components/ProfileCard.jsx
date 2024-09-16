import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import bgimg from "../assets/mwhbg.jpeg";
import Loading from "./Loading";
import Error from "./Error";
import AllPost from "./AllPost";
import EditUser from "./EditUser";
import AddPost from "./AddPost";

export default function ProfileCard() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7051/api/Users/${username}`
        );
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "User not found");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative">
        <img
          src={bgimg}
          alt="Cover Photo"
          className="w-full h-[350px] object-cover"
        />
        <img
          src={user?.profile_url}
          alt="Profile Picture"
          className="absolute -bottom-20 left-4 w-40 h-40 rounded-full border-4 border-blue-500"
        />
      </div>

      <div className="mt-24 px-4">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h1 className="text-3xl font-bold">{user?.username}</h1>
          </div>
          <div className="flex space-x-2">
            {userData.username.trim() === username.trim() ? (
              <>
                <Link to={`/quiz/one-player/${user?.username}`}>
                  <button className="btn btn-primary">Start Quiz</button>
                </Link>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    document.getElementById("proverb_add").showModal()
                  }
                >
                  Edit
                </button>
                <dialog id="proverb_add" className="modal">
                  <div className="modal-box">
                    <EditUser />
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </>
            ) : (
              <Link to={`/quiz/two-player/with-${user?.username}`}>
                <button className="btn btn-primary">Challenge</button>
              </Link>
            )}
          </div>
        </div>
        <div role="tablist" className="tabs tabs-bordered">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Posts"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content p-10">
            <div className="p-4 mb-4">
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src={user?.profile_url}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />

                <input
                  type="text"
                  placeholder="What's on your mind, John?"
                  className="flex-grow bg-gray-100 rounded-full py-2 px-4"
                  onClick={() =>
                    document.getElementById("post_add").showModal()
                  }
                />
                <dialog id="post_add" className="modal">
                  <div className="modal-box">
                    <AddPost />
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>
            </div>
            <AllPost user_id={user?.id} />
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="About"
          />
          <div role="tabpanel" className="tab-content p-10">
            About content
            <ul>
              <li>
                {user?.firstName} {user?.lastName}
              </li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
