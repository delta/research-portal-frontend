import React,{useState,useEffect} from 'react';
import './SideBarMob.css';
import dummyImg from "./assets/profile.png";
import loggedImg from "./assets/logged.png";
import { Link } from "react-router-dom";


const data = [{
	href: '/home',
	text: 'Home'
},
{
	href: '/research',
	text: 'Research'
},
{
	href: '/labs',
	text: 'Labs'
},
{
	href: '/centers-of-excellence',
	text: 'CENTERS'
},
{
	href: '/professors',
	text: 'Profs'
}];
const SideBarMob = (props:any) => {
    const [user, setUser] = useState(true);
    useEffect(() => {
      if (localStorage.getItem("email") != null) setUser(true);
      else setUser(false);
    }, [user]);
    return (
      <div className="w-8/12 bg-red-50 h-screen border-l-2 border-gray-200 right-0 absolute z-10">
        <div className="flex justify-center p-4">
          {user === true ? (
            <img src={loggedImg} alt='user'></img>
          ) : (
            <img src={dummyImg} alt='user'></img>
          )}
        </div>
        {!user ? (
          <div className="pt-2 pb-2 text-center cursor-pointer">
            <Link to="/login">Login</Link>
          </div>
        ) : (
          <div className="pt-2 pb-2 text-center cursor-pointer">
            <button
              onClick={() => {
                localStorage.clear();
                setUser(false);
              }}
            >
              Logout
            </button>
          </div>
        )}
        {data.map((val, key) => {
          return (
            <a href={val.href} key={key}>
              <Link to={val.href} key={key}><div className="pt-2 pb-2 text-center cursor-pointer">
                <h1>{val.text}</h1>
              </div></Link>
            </a>
          );
        })}
      </div>
    );
}

export default SideBarMob;
