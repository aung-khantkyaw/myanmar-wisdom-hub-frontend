import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Error from "../components/Error";
import { Menu } from "lucide-react";
import EditPost from "./EditPost";
import axios from "axios";

const AllPost = ({ user_id }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all posts from the API
    fetch(`https://localhost:7051/api/Posts/${user_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto">
      {posts.length > 0 ? (
        posts?.map((post) => (
          <div
            key={post.id}
            className="card border border-sm shadow shadow-md p-4 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <img
                  src={`https://localhost:7051/${post.profile}`}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{post.username}</p>
                </div>
              </div>
              <div>
                <details className="dropdown">
                  <summary className="btn m-1">
                    <Menu />
                  </summary>
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow">
                    <li>
                      <button
                        onClick={() =>
                          document.getElementById("post_edit").showModal()
                        }
                      >
                        Edit
                      </button>
                    </li>
                    <dialog id="post_edit" className="modal">
                      <div className="modal-box">
                        <EditPost post={post} />
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                    <li>
                      <button
                        className="btn btn-sm btn-error font-bold text-base-100"
                        onClick={() =>
                          axios
                            .delete(
                              `https://localhost:7051/api/Posts/${post.id}`
                            )
                            .then(() => {
                              setPosts(posts.filter((p) => p.id !== post.id));
                            })
                            .catch((error) => {
                              setError(error);
                            })
                        }
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </details>
              </div>
            </div>
            <h1 className="text-xl font-bold mb-4">{post.title}</h1>
            <p
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: post.body }}
            ></p>
          </div>
        ))
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold">This has no post!</h1>
        </div>
      )}
    </div>
  );
};

AllPost.propTypes = {
  user_id: PropTypes.number,
};
export default AllPost;
