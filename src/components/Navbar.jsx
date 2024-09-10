import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { FaSun, FaMoon } from "react-icons/fa";
import { BsPersonFill, BsLayoutWtf, BsBoxArrowRight } from "react-icons/bs";

const Navbar = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("night");
    } else {
      setTheme("light");
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("userData");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <div className="bg-base-100 shadow-md">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/proverb">Proverb</Link>
              </li>
              <li>
                <Link to="/riddle">Riddle</Link>
              </li>
              {userData ? (
                <>
                  <li>
                    <Link to="/newsfeed">Newsfeed</Link>
                  </li>
                  <li>
                    <Link to="/quiz">Quiz</Link>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
          <a href="" className="font-black text-2xl">
            <img src="/logo.png" alt="" className="w-14" />
            {/* <span className="text-primary">Myanmar </span> Wisdom Hub */}
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/" className="font-bold text-base">
                Home
              </Link>
            </li>
            <li>
              <Link to="/proverb" className="font-bold text-base">
                Proverb
              </Link>
            </li>
            <li>
              <Link to="/riddle" className="font-bold text-base">
                Riddle
              </Link>
            </li>
            {userData ? (
              <>
                <li>
                  <Link to="/newsfeed" className="font-bold text-base">
                    Newsfeed
                  </Link>
                </li>
                <li>
                  <Link to="/quiz" className="font-bold text-base">
                    Quiz
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
        </div>
        <div className="navbar-end">
          <label className="swap swap-rotate mx-2">
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
              onChange={handleToggle}
              checked={theme === "light" ? false : true}
            />
            <FaSun className="swap-off fill-current w-6 h-6" />
            <FaMoon className="swap-on fill-current w-5 h-5" />
          </label>
          {userData ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-neutral rounded-btn font-bold"
              >
                {userData.username}
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
              >
                <li>
                  <a
                    href={userData.username}
                    className="flex items-center gap-4"
                  >
                    <BsPersonFill />
                    Profile
                  </a>
                </li>
                <li>
                  <a href="/dashboard" className="flex items-center gap-4">
                    <BsLayoutWtf />
                    Dashboard
                  </a>
                </li>
                <li>
                  <a onClick={handleLogout} className="flex items-center gap-4">
                    <BsBoxArrowRight />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <a href="/login" className="btn btn-primary font-bold text-white">
              Login
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
