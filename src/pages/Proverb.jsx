import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import bgImage from "../assets/mwhbg.jpeg";

import { useEffect, useState } from "react";
import Error from "../components/Error";

const Proverb = () => {
  const [proverbs, setProverbs] = useState([]);
  const [showEnglish, setShowEnglish] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all proverbs from the API
    fetch("https://localhost:7051/api/Proverbs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setProverbs(data);
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded rounded-lg flex justify-between p-6 mb-6 items-center">
            <span className="font-bold">Proverb</span>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setShowEnglish(!showEnglish)}
            >
              {showEnglish ? "View Burmese" : "View English"}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {proverbs.map((proverb, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {showEnglish ? (
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">
                      {proverb.proverb_english}
                    </h2>
                    <p className="text-gray-600">{proverb.meaning_english}</p>
                  </div>
                ) : (
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">
                      {proverb.proverb_burmese}
                    </h2>
                    <p className="text-gray-600">{proverb.meaning_burmese}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Proverb;
