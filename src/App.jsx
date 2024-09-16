import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Proverb from "./pages/Proverb";
import Riddle from "./pages/Riddle";
import Newsfeed from "./pages/Newsfeed";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Profile from "./pages/auth/Profile";
import Dashboard from "./pages/auth/Dashboard";
import Quiz from "./pages/Quiz";
import AttemptQuiz from "./components/AttemptQuiz";
import TwoPlayer from "./components/TwoPlayer";
import AttemptQuizWith from "./components/AttemptQuizWith";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/proverb",
    element: <Proverb />,
  },
  {
    path: "/riddle",
    element: <Riddle />,
  },
  {
    path: "/newsfeed",
    element: <Newsfeed />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
  {
    path: "/quiz/one-player/:username",
    element: <AttemptQuiz />,
  },
  {
    path: "/quiz/two-player",
    element: <TwoPlayer />,
  },
  {
    path: "/quiz/two-players/:username/:rival",
    element: <AttemptQuiz />,
  },
  {
    path: "/quiz/two-players/with/:username/:attemptId",
    element: <AttemptQuizWith />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/:username",
    element: <Profile />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
