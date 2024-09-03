import Navbar from "../../components/Navbar";
import AddProverb from "../../components/AddProverb";
import AddRiddle from "../../components/AddRiddle";
import AddPost from "../../components/AddPost";
import AddQuiz from "../../components/AddQuiz";
import Notification from "../../components/Notification";

const Dashboard = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <div className="w-full relative">
      <div className="w-full fixed top-0 z-10">
        <Navbar />
      </div>
      <div className="bg-base-200 min-h-screen pt-20">
        <div className="container mx-auto mt-8">
          {userData.username === "admin@mwh" ? (
            <div className="bg-base-100 p-4 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold">
                Welcome, {userData.first_name} {userData.last_name} !
              </h1>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="addProverb mb-2">
                  <button
                    className="btn btn-primary font-bold w-full text-base-100"
                    onClick={() =>
                      document.getElementById("proverb_add").showModal()
                    }
                  >
                    Add Proverb
                  </button>
                  <dialog id="proverb_add" className="modal">
                    <div className="modal-box">
                      <AddProverb />
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </div>

                <div className="addRiddle mb-2">
                  <button
                    className="btn btn-primary font-bold w-full text-base-100"
                    onClick={() =>
                      document.getElementById("riddle_add").showModal()
                    }
                  >
                    Add Riddle
                  </button>
                  <dialog id="riddle_add" className="modal">
                    <div className="modal-box">
                      <AddRiddle />
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </div>

                <div className="addQuiz mb-2">
                  <button
                    className="btn btn-primary font-bold w-full text-base-100"
                    onClick={() =>
                      document.getElementById("quiz_add").showModal()
                    }
                  >
                    Add Quiz
                  </button>
                  <dialog id="quiz_add" className="modal">
                    <div className="modal-box">
                      <AddQuiz />
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="col-span-2">
                  <AddPost />
                </div>
                <div>
                  <Notification />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-base-100 p-4 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold">
                Welcome, {userData.first_name} {userData.last_name} !
              </h1>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="col-span-2">
                  <AddPost />
                </div>
                <div>
                  <Notification />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
