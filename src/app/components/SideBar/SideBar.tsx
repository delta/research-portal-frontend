import { useState, useEffect } from "react";
import "./SideBar.css";
import dummyImg from "./assets/profile.png";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";
import { ProfileData } from "../../interfaces/profile";

// const data = [{
//     text: 'sample'
// },
// {
//     text: 'info'
// },
// {
//     text: 'displaying'
// },
// {
//     text: 'world'
// }]
const SideBar = (props: any) => {
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
  const { closeSideBar } = props;

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
    <div className="w-64 bg-white h-screen border-l-2 border-gray-200">
      <div className="w-64 bg-gray-800 h-20 text-left p-6">
        <button onClick={closeSideBar}>
          <h1 className="text-white text-xl">
            <i className="fas fa-arrow-right"></i>
          </h1>
        </button>
      </div>
      <div className="w-64 text-center pt-3">
        {/*Image container*/}
        <div className="text-center p-4 border-b-2 border-black">
          {user === true ? (
            <div className="flex">
              <img
                alt="Placeholder"
                className="rounded-full h-24 w-24"
                src={`${profileData?.data.image_url}`}
              ></img>
              <header className="flex items-center justify-between leading-tight p-2 ">
                <h1 className="text-xl fond-bold">{profileData?.data.name}</h1>
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
        {!user ? (
          <div className="p-1">
            {/*Menu when logged out*/}
            <div className="p-3 text-lg flex justify-content-start cursor-pointer w-full hover:bg-gray-800 hover:text-white">
              <span>
                <i className="fas fa-sign-in-alt mr-3"></i>
                <Link to="/login">Login</Link>
              </span>
            </div>
            <div className="p-3 text-lg flex justify-content-start cursor-pointer my-2 w-full hover:bg-gray-800 hover:text-white">
              <span>
                <i className="fas fa-user-plus mr-3"></i>
                <Link to="/signup">Register</Link>
              </span>
            </div>
          </div>
        ) : (
          <div className="p-1">
            {/*Menu when a user is logged in*/}
            <div className="p-3 text-lg flex justify-content-start cursor-pointer my-2 w-full hover:bg-gray-800 hover:text-white">
            <span>
              <i className="far fa-user-circle mr-3"></i>
              <Link to='/'>Profile</Link>
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
    </div>
  );
};

export default SideBar;
