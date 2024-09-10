import AttemptQuiz from "../components/AttemptQuiz";
import Navbar from "../components/Navbar";
export default function Quiz() {
  return (
    <div className="w-full relative">
      <div className="w-full fixed top-0 z-10">
        <Navbar />
      </div>
      <AttemptQuiz />
    </div>
  );
}
