import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import bgImage from "../assets/mwhbg.jpeg";

import { useEffect, useState } from "react";
import Error from "../components/Error";

const Proverb = () => {
  const [proverbs, setProverbs] = useState([]);
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
        <div className="container mx-auto">
          {proverbs.map((proverb) => (
            <div key={proverb.id} className="justify-center items-center p-5">
              <div className="border shadow-teal-300 shadow-md p-6 rounded-lg bg-base-100 w-full">
                <h1 className="text-xl font-mono font-extrabold py-3">
                  {proverb.proverb_burmese}
                </h1>
                <div className="divider"></div>
                <div>
                  <p className="text-lg font-semibold">
                    {proverb.proverb_english}
                  </p>
                  <ul className="list-disc text-lg px-6">
                    <li>{proverb.meaning_burmese}</li>
                    <li>{proverb.meaning_english}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Proverb;
