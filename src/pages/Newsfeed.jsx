import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import Error from "../components/Error";

// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const Newsfeed = () => {
  // const posts = [
  //   {
  //     id: 1,
  //     title: "The Future of AI in Healthcare",
  //     author: "Dr. Emily Sharma",
  //     body: "Artificial intelligence (AI) is poised to revolutionize the healthcare industry, offering unprecedented opportunities to improve patient outcomes, streamline clinical workflows, and accelerate medical research. From predictive analytics to personalized treatment plans, the integration of AI-powered technologies is transforming the way healthcare professionals approach diagnosis, treatment, and disease management. In this article, we will explore the exciting frontiers of AI in healthcare and the profound impact it is set to have on the well-being of individuals and communities around the world.",
  //   },
  //   {
  //     id: 2,
  //     title: "Sustainable Living: Tips for Eco-Conscious Consumers",
  //     author: "Sarah Greenfield",
  //     body: "In an era of growing environmental concerns, sustainable living has become a crucial aspect of modern life. As individuals, we have the power to make a significant impact on the planet through our daily choices and actions. In this comprehensive guide, we will delve into practical tips and strategies that empower eco-conscious consumers to reduce their carbon footprint, conserve natural resources, and contribute to a more sustainable future. From energy-efficient home upgrades to mindful consumption habits, this article will equip you with the knowledge and tools to live a more sustainable lifestyle.",
  //   },
  //   {
  //     id: 3,
  //     title: "The Rise of Remote Work: Navigating the New Normal",
  //     author: "Michael Nguyen",
  //     body: "The COVID-19 pandemic has ushered in a profound shift in the way we work, with remote work becoming the new normal for millions of people around the world. This transition has brought about both challenges and opportunities, as individuals and organizations navigate the complexities of working from home. In this insightful article, we will explore the key aspects of remote work, including the benefits, the challenges, and the strategies that can help individuals and teams thrive in this new work environment. Whether you're a seasoned remote worker or just starting to adapt to this change, this article will provide you with valuable insights and practical tips to make the most of the remote work revolution.",
  //   },
  // ];

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
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error error={error.message} />;
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
            {posts.map((post) => (
              <div
                key={post.id}
                className="card border border-sm shadow shadow-md p-4 mb-4 w-2/3 mx-auto bg-base-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={post.profile}
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
