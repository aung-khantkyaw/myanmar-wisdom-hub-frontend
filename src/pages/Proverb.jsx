import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import EditProverb from "../components/EditProverb";
import axios from "axios";
// import bgImage from "../assets/mwhbg.jpeg";

import { useEffect, useState } from "react";
import Error from "../components/Error";

const Proverb = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [proverbs, setProverbs] = useState([]);
  const [showBurmese, setShowBurmese] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all proverbs from the API using Axios
    axios
      .get("https://localhost:7051/api/Proverbs")
      .then((response) => {
        console.log(response.data);
        setProverbs(response.data);
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

      <div className="bg-base-200 min-h-screen py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-base-100 rounded rounded-lg flex justify-between p-6 mb-6 items-center">
            <span className="font-bold">Proverb</span>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setShowBurmese(!showBurmese)}
            >
              {showBurmese ? "View English" : "View Burmese"}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {proverbs.map((proverb, index) => (
              <div
                key={index}
                className="bg-base-100 rounded-lg shadow-md overflow-hidden h-[250px]"
              >
                {userData?.username === "admin@mwh" ? (
                  <>
                    <div className="flex justify-evenly">
                      <button
                        className="btn btn-sm btn-primary w-1/3 font-bold text-base-100"
                        onClick={() =>
                          document.getElementById(proverb.id).showModal()
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-error w-1/3 font-bold text-base-100"
                        onClick={() =>
                          axios
                            .delete(
                              `https://localhost:7051/api/Proverbs/${proverb.id}`
                            )
                            .then(() => {
                              setProverbs(
                                proverbs.filter((p) => p.id !== proverb.id)
                              );
                            })
                            .catch((error) => {
                              setError(error);
                            })
                        }
                      >
                        Delete
                      </button>
                    </div>
                    <dialog id={proverb.id} className="modal">
                      <div className="modal-box">
                        <EditProverb
                          proverb_id={proverb.id}
                          proverb_burmese={proverb.proverb_burmese}
                          meaning_burmese={proverb.meaning_burmese}
                          proverb_english={proverb.proverb_english}
                          meaning_english={proverb.meaning_english}
                        />
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </>
                ) : null}
                <div className="p-6">
                  {showBurmese ? (
                    <>
                      <h2 className="text-xl font-bold mb-2">
                        {proverb.proverb_burmese}
                      </h2>
                      <p className="">{proverb.meaning_burmese}</p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold mb-2">
                        {proverb.proverb_english}
                      </h2>
                      <p className="">{proverb.meaning_english}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Proverb;
