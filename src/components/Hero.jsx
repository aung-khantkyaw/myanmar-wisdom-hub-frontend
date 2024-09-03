import Myanmar from "../assets/myanmar.svg";

const Hero = () => {
  const userData = localStorage.getItem("userData");

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={Myanmar} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">Myanmar Wisdom Hub</h1>
          <p className="py-6 font-bold">
            Welcome to Myanmar Wisdom Hub, where you can explore the rich
            traditions and cultural heritage of Myanmar. Discover the timeless
            wisdom, history, and beauty that make Myanmar unique.
          </p>
          {userData ? (
            <a
              href="/dashboard"
              className="btn btn-primary font-bold text-white"
            >
              Dashboard
            </a>
          ) : (
            <a
              href="/register"
              className="btn btn-primary font-bold text-white"
            >
              Create a New Account
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
