import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "./Loading";
import Error from "./Error";
import AllPost from "./AllPost";

const ProfileCard = () => {
  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7051/api/Users/${username}`
        );
        setUser(response.data.user);
      } catch (err) {
        setError(err.response?.data?.message || "User not found");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <section className="w-full overflow-hidden bg-base-300">
      <div className="flex flex-col">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080"
          alt="User Cover"
          className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]"
        />

        <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
          <img
            src={user?.profile_url}
            alt="User Profile"
            className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
          />

          <h1 className="w-full text-left my-4 sm:mx-4 xs:pl-4  lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
            {user?.first_name} {user?.last_name}
            <span className="text-sm block mt-2"> @ {user?.username} </span>
          </h1>
        </div>

        <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
          {/* <p className="w-fit text-gray-700 dark:text-gray-400 text-md">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      Quisquam debitis labore consectetur voluptatibus mollitia
      dolorem veniam omnis ut quibusdam minima sapiente
      repellendus asperiores explicabo, eligendi odit, dolore
      similique fugiat dolor, doloremque eveniet. Odit,
      consequatur. Ratione voluptate exercitationem hic eligendi
      vitae animi nam in, est earum culpa illum aliquam.
    </p> */}
          <AllPost user_id={user?.id} />
        </div>
      </div>
    </section>
  );
};
export default ProfileCard;
