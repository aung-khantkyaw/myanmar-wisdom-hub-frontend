import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import Error from "../components/Error";

// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const Newsfeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullBody, setShowFullBody] = useState({});

  useEffect(() => {
    // Fetch all posts from the API
    fetch(`https://localhost:7051/api/Posts`)
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
        setError(error.message.title || "Resource not found");
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error type={404} error={error} link={"/"} />;

  const toggleFullBody = (postId) => {
    setShowFullBody((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  return (
    <div className="w-full relative">
      <div className="w-full fixed top-0 z-10">
        <Navbar />
      </div>

      <div className="bg-base-200 min-h-screen pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {posts
              .slice()
              .reverse()
              .map((post) => (
                <div
                  key={post.id}
                  className="card border border-sm shadow shadow-md p-4 mb-4 w-2/3 mx-auto bg-base-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={`https://localhost:7051/${post.profile}`}
                        alt="User"
                        className="w-10 h-10 rounded border border-md"
                      />
                      <div>
                        <p className="font-bold text-lg">{post.title}</p>
                        by{" "}
                        <a href={post.username} className="font-semibold">
                          {post.username}
                        </a>
                      </div>
                    </div>
                    <button size="icon">
                      {/* <MoreHorizontal className="h-4 w-4" /> */}
                    </button>
                  </div>
                  <p>
                    {showFullBody[post.id] ? (
                      <div
                        className="text-lg font-semibold"
                        dangerouslySetInnerHTML={{ __html: post.body }}
                      />
                    ) : (
                      <div
                        className="text-lg font-semibold"
                        dangerouslySetInnerHTML={{
                          __html: `${post.body.slice(0, 150)}${
                            post.body.length > 150 ? "..." : ""
                          }`,
                        }}
                      />
                    )}
                  </p>
                  {post.body.length > 150 && (
                    <span
                      onClick={() => toggleFullBody(post.id)}
                      className="mt-2"
                      role="button"
                      tabIndex="0"
                    >
                      {showFullBody[post.id] ? "See less" : "See more..."}
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Newsfeed;
