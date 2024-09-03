import Loading from "../components/Loading";

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
        console.log(data);
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error error={error.message} />;
  return (
    <div className="container mx-auto mt-8 ">
      {posts.map((post) => (
        <div key={post.id} className="justify-center items-center p-5">
          <div className="border shadow-teal-300 shadow-md p-6 rounded-lg bg-base-100 w-full">
            <h1 className="text-xl font-mono font-extrabold py-3">
              {post.title}
            </h1>
            <div className="divider"></div>
            <div>
              <div
                className="text-lg font-semibold"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

AllPost.propTypes = {
  user_id: PropTypes.number,
};
export default AllPost;
