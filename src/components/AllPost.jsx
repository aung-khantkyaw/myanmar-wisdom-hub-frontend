import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Error from "../components/Error";

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
      {error && <Error error={error} />}
      {posts.length > 0 ? (
        posts?.map((post) => (
          <div
            key={post.id}
            className="card border border-sm shadow shadow-md p-4 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <img
                  src={post.profile}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{post.username}</p>
                </div>
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
        <Error error={"Post Not Found!"} />
      )}
    </div>
  );
};

AllPost.propTypes = {
  user_id: PropTypes.number,
};
export default AllPost;
