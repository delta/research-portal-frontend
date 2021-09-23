import { useState, useEffect } from 'react';
import './Research.css'
import { Button } from 'tailwind-react-ui'
import { axiosInstance } from "../../utils/axios";
import {Link} from 'react-router-dom';
import ResearchCard from "./ResearchCard";
import FilterBar from './FilterBar';
import {
  Project,
} from "../../interfaces/projects";
import NoResults from '../NoResults/NoResults' ;

const Research = () => {
  const [user,setUser] = useState(false);
  const [researches,setResearches] = useState<Array<Project>>([]);
  
  const getResearches = () => {
    let url = `/projects`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setResearches(res.data.data);
      })
      .catch((err: Error) => console.log(err));
  }

  const getUserPrivilege = () => {
    let url = `/user/is_staff/`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setUser(res.data.data);
      })
      .catch((err: Error) => console.log(err));
    url = `/admin_user/search/?professor=${localStorage.getItem('email')}`
  }

  useEffect(() => {
    getUserPrivilege();
    getResearches();
  }, []);

  const showResearches = ()=>{
    return researches.map((item, key) => {
      return (
        <ResearchCard data={item} key={key}/>
      );
    })
  };
  const noResult = ()=>{
      return (
        <NoResults flag={0}/>
      );
  };

  return (
    <div className="wrapper">
      <div className="main-container mb-10">
        
        <FilterBar setResearches={setResearches} />
        
        {/* project card container */}
        <div className="result-container relative m-3 flex flex-auto justify-center">
          <div className="flex flex-wrap m-10">
            {researches.length ?  showResearches(): noResult()}
          </div>
          {user ? (
            <Link to="/create-project" className="absolute right-10 -top-4">
              <Button className="w-64 mt-4 bg-red-800 hover:bg-red-600 transform hover:scale-105 transition duration-300 text-white">
                Create Project
              </Button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Research;
