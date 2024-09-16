import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
export default function Quiz() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <div className="w-full relative">
      <div className="w-full fixed top-0 z-10">
        <Navbar />
      </div>
      <div
        className="hero bg-base-200 min-h-screen"
        // style={{
        //   backgroundImage: `url("HistoryofPuzzles.jpg")`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   backgroundAttachment: "fixed",
        // }}
      >
        <div className="hero-content flex-col">
          <h1 className="text-3xl font-bold text-center mb-8">
            Choose Your Quiz Mode
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card border border-sm shadow shadow-md bg-base-100">
              <div className="card-body">
                <div className="card-title">One Player Mode</div>
                <p className="mb-6">
                  Challenge yourself in a solo quiz adventure!
                </p>
                <Link to={`/quiz/one-player/${userData.username}`}>
                  <button className="w-full btn btn-neutral">
                    Start One Player Quiz
                  </button>
                </Link>
              </div>
            </div>
            <div className="card border border-sm shadow shadow-md bg-base-100">
              <div className="card-body">
                <div className="card-title">Two Player Mode</div>
                <p className="mb-6">
                  Compete with a friend in an exciting quiz battle!
                </p>
                <Link to="/quiz/two-player">
                  <button className="w-full btn btn-neutral">
                    Start Two Player Quiz
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
