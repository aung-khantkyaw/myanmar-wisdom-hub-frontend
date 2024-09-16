import Navbar from "../../components/Navbar";
import ProfileCard from "../../components/ProfileCard";
const Profile = () => {
  return (
    <div className="w-full relative">
      <div className="w-full fixed top-0 z-10">
        <Navbar />
      </div>
      <div className="bg-base-200 min-h-screen pt-20">
        <div className="container mx-auto mt-8">
          <div className="bg-base-100 p-4 rounded-lg shadow-lg">
            <ProfileCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
