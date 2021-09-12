import React,{useState,useEffect} from 'react';
import './SideBar.css';
import dummyImg from "./assets/profile.png";
import loggedImg from "./assets/logged.png";
import { Link } from "react-router-dom";
import { axiosInstance } from '../../utils/axios';

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
const SideBar = (props:any) => {
    const [user, setUser] = useState(false);
    useEffect(() => {
      // console.log(localStorage.getItem("email"));
      if (localStorage.getItem("email")?.length) setUser(true);
      if(user===true){

      }
    }, []);
    const {closeSideBar} = props;

    async function logout(){
      let url=`/user/logout/`;
      await axiosInstance({
        method:'POST',
        url:url,
      }).then((res:any)=>{
        localStorage.removeItem('email');
        setUser(false);
      })
    }

    return (
      <div className="w-64 bg-red-50 h-screen border-l-2 border-gray-200">
        <div className="w-64 bg-gray-800 h-20 text-left p-6">
          <button onClick={closeSideBar}>
            <h1 className="text-white text-xl">
              <i className="fas fa-arrow-right"></i>
            </h1>
          </button>
        </div>
        <div className="w-64 text-center pt-3">
          <div className="text-center p-4">
            {user === true ? (
              <img src={loggedImg} alt='user' className="p-10"></img>
            ) : (
              <img src={dummyImg} alt='user' className="p-10"></img>
            )}
          </div>
          {!user ? (
            <div className="pt-2 pb-2 text-center hover:bg-gray-400 cursor-pointer">
              <Link to="/login">Login</Link>
            </div>
          ) : (
            <div className="pt-2 pb-2 text-center hover:bg-gray-400 cursor-pointer">
              <button
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    );
}

export default SideBar;