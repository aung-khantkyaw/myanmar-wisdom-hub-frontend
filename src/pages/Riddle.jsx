import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
// import bgImage from "../assets/mwhbg.jpeg";
import axios from "axios";
import EditRiddle from "../components/EditRiddle";
import { useEffect, useState } from "react";

const Riddle = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
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
        // style={{
        //   backgroundImage: `url(${bgImage})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   backgroundAttachment: "fixed",
        // }}
      >
        <div className="container mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {riddles.map((riddle) => (
              <div
                key={riddle.id}
                className="bg-base-100 shadow-md rounded-lg overflow-hidden"
              >
                {userData?.username === "admin@mwh" ? (
                  <>
                    <div className="flex justify-evenly">
                      <button
                        className="btn btn-sm btn-primary w-1/3 font-bold text-base-100"
                        onClick={() =>
                          document.getElementById(riddle.id).showModal()
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-error w-1/3 font-bold text-base-100"
                        onClick={() =>
                          axios
                            .delete(
                              `https://localhost:7051/api/Riddles/${riddle.id}`
                            )
                            .then(() => {
                              setRiddles(
                                riddles.filter((p) => p.id !== riddle.id)
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
                    <dialog id={riddle.id} className="modal">
                      <div className="modal-box">
                        <EditRiddle
                          riddle_id={riddle.id}
                          riddle={riddle.riddle}
                          answer={riddle.answer}
                        />
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </>
                ) : null}
                <div className="p-6">
                  <h2 className="text-lg font-bold mb-4">{riddle.riddle}</h2>
                  <div className="hidden" id={`answer-${riddle.id}`}>
                    <p className="font-bold mb-4 bg-base-200 p-2 rounded rounded-md">
                      {riddle.answer}
                    </p>
                  </div>
                  <button
                    className="btn btn-neutral btn-sm text-primary-foreground px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => {
                      const answerElement = document.getElementById(
                        `answer-${riddle.id}`
                      );
                      answerElement.classList.toggle("hidden");
                    }}
                  >
                    Show/Hide Answer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Riddle;
