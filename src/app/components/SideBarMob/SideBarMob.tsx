import { useState, useEffect } from "react";
import "./SideBarMob.css";
import dummyImg from "./assets/profile.png";
import { ProfileData } from "../../interfaces/profile";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";

const SideBarMob = () => {
  const [user, setUser] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>();
  useEffect(() => {
    if (localStorage.getItem("email")?.length) setUser(true);
    async function fetchData() {
      if (user === true) {
        let url = `/admin_user/profile/?email=${localStorage.getItem("email")}`;
        await axiosInstance
          .get(url)
          .then((res: any) => {
            res.data.filteredProjects = res.data.projects;
            res.data.filteredNon_admin_projects = res.data.non_admin_projects;
            setProfileData(res.data);
          })
          .catch((err: Error) => console.log(err));
      }
    }
    fetchData();
    return;
  }, [user]);

  async function logout() {
    let url = `/user/logout/`;
    await axiosInstance({
      method: "POST",
      url: url,
    }).then((res: any) => {
      localStorage.removeItem("email");
      setUser(false);
    });
  }

  return (
    <div className="w-8/12 bg-white h-screen border-l-2 border-gray-200 right-0 absolute z-10">
      <div className="text-center p-4 border-b-2 border-black">
        {user === true ? (
          <div className="flex">
            <img
              alt="Placeholder"
              className="rounded-full h-24 w-24"
              src={`${profileData?.data.image_url}`}
            ></img>
            <header className="flex items-center justify-between leading-tight p-2 ">
              <h1 className="text-md fond-bold">{profileData?.data.name}</h1>
            </header>
          </div>
        ) : (
          <img
            alt="Placeholder"
            className="rounded-full h-24 w-24"
            src={dummyImg}
          ></img>
        )}
      </div>
      {/*Common menu options*/}
      <div className="p-3 text-lg flex justify-content-start cursor-pointer w-full hover:bg-gray-800 hover:text-white">
        <span>
          <i className="fas fa-home mr-3"></i>
          <Link to="/home">Home</Link>
        </span>
      </div>
      <div className="p-3 text-lg flex justify-content-start cursor-pointer w-full hover:bg-gray-800 hover:text-white">
        <span>
          <i className="fas fa-flask mr-3"></i>
          <Link to="/labs">Labs</Link>
        </span>
      </div>
      <div className="p-3 text-lg flex justify-content-start cursor-pointer w-full hover:bg-gray-800 hover:text-white">
        <span>
          <i className="fas fa-warehouse mr-3"></i>
          <Link to="/centers-of-excellence">Centers</Link>
        </span>
      </div>
      <div className="p-3 text-lg flex justify-content-start cursor-pointer w-full hover:bg-gray-800 hover:text-white">
        <span>
          <i className="fas fa-project-diagram mr-3"></i>
          <Link to="/research">Projects</Link>
        </span>
      </div>
      <div className="p-3 text-lg flex justify-content-start cursor-pointer w-full hover:bg-gray-800 hover:text-white">
        <span>
          <i className="fas fa-chalkboard-teacher mr-3"></i>
          <Link to="/professors">Professors</Link>
        </span>
      </div>
      {!user ? (
        <div className="p-1">
          {/*Menu when logged out*/}
          <div className="p-3 text-lg flex justify-content-start cursor-pointer w-full hover:bg-gray-800 hover:text-white">
            <span>
              <i className="fas fa-sign-in-alt mr-3"></i>
              <Link to="/login">Login</Link>
            </span>
          </div>
          <div className="p-3 text-lg flex justify-content-start cursor-pointer w-full hover:bg-gray-800 hover:text-white">
            <span>
              <i className="fas fa-user-plus mr-3"></i>
              <Link to="/signup">Register</Link>
            </span>
          </div>
        </div>
      ) : (
        <div className="p-1">
          {/*Menu when a user is logged in*/}
          <div className="p-3 text-lg flex justify-content-start cursor-pointer w-full hover:bg-gray-800 hover:text-white">
            <span>
              <i className="far fa-user-circle mr-3"></i>
              <Link to="/">Profile</Link>
            </span>
          </div>
          <div className="p-3 text-lg flex justify-content-start cursor-pointer w-full hover:bg-gray-800 hover:text-white">
            <span>
              <i className="fas fa-file mr-3"></i>
              <Link to="/resume">My Resume</Link>
            </span>
          </div>
          <div className="p-3 text-lg flex justify-content-start cursor-pointer w-full hover:bg-gray-800 hover:text-white">
            <span>
              <i className="fas fa-sign-out-alt mr-3"></i>
              <button onClick={logout}>Logout</button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBarMob;
