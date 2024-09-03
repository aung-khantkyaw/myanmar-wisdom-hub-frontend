import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import bgImage from "../assets/mwhbg.jpeg";

import { useEffect, useState } from "react";

const Riddle = () => {
  const [riddles, setRiddles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all riddles from the API
    fetch("https://localhost:7051/api/Riddles")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRiddles(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="w-full relative">
      <div className="w-full fixed top-0 z-10">
        <Navbar />
      </div>

      <div
        className="bg-base-200 min-h-screen pt-24"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto">
          {riddles.map((riddle) => (
            <div
              className="collapse collapse-plus bg-base-100 m-2 border shadow-teal-300 shadow-md"
              key={riddle.id}
            >
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                <span className="font-bold">{riddle.riddle}</span>
              </div>
              <div className="collapse-content">
                <hr className="mb-2" /> <span>အဖြေ - {riddle.answer}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Riddle;
