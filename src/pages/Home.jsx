import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Timeline from "../components/Timeline";

const Home = () => {
  return (
    <div className="w-full relative">
      <div className="w-full fixed top-0 z-10">
        <Navbar />
      </div>
      <Hero />
      <Timeline />
      <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by Myanmar Wisdom Hub.
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Home;
