import React, { useState, useEffect } from 'react';
import { Select, Field, Label, Row, Col, Card, CardBody, Button, Article, ContentTitle, Text, Aside } from 'tailwind-react-ui'
import './Research.css'
import img from './Assets/icon.jpg';
import { axiosInstance } from "../../utils/axios";
import {Link} from 'react-router-dom';
import ResearchCard from "./ResearchCard";

const Research = () => {
  const [user,setUser] = useState(false);

  const [searchDept,setSearchDept] = useState("");
  const [searchName,setSearchName] = useState("");
  const [headName,setHeadName] = useState("");
  const [aor,setAor] = useState("");

  const [departments,setDepartments] = useState([]);
  const [researches,setResearches] = useState([{name:"",description:""}]);
  
  const getResearches = () => {
    let url = `/projects`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setResearches(res.data.data);
      })
      .catch((err: Error) => console.log(err));
  }

  const getDepartments = () => {
    let url = `/department`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setDepartments(res.data.data);
      })
      .catch((err: Error) => console.log(err));
    url = `/admin_user/search/?professor=${localStorage.getItem('email')}`
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
    getDepartments();
  }, []);

  const showResearches = ()=>{
    return researches.map((item, key) => {
      return (
        <ResearchCard data={item} key={key}/>
      );
    })
  };

  const handleDepartmentChange = (e: any) => {
    setSearchDept(e.target.value);
  };

  const handleHeadNameChange = (e: any) => {
    setHeadName(e.target.value);
  };

  const handleQuery = () => {
    let url = `/project/search?department=${searchDept}&projectName=${searchName}&headName=${headName}&aor=${aor}`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setResearches(res.data.data);
      })
      .catch((err: Error) => console.log(err));
  };

  useEffect(() => {
    handleQuery();
  }, [searchDept,searchName,headName,aor]);

  const handleSearchByProjectName = (e: any) => {
    setSearchName(e.target.value);
  };

  const handleSearchByAor = (e: any) => {
    setAor(e.target.value);
  };


  return (
    <div className="wrapper">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-6 justify-items-center md:justify-items-start">
          {/* <Link to='/my-research' className="m-3"><Button className="w-full bg-red-800 text-white">My Research</Button></Link> */}
          {user ? (
            <Link to="/create-project" className="m-3">
              <Button className="w-full bg-red-800 text-white">
                Create Project
              </Button>
            </Link>
          ) : null}
          <div className="searchHolder relative flex mb-3 mt-3 w-full">
            <input
              type="text"
              className="searchInput h-10 border-2 border-black pr-8 pl-5 rounded z-0 focus:shadow focus:border-red-800"
              placeholder="Search by project Name"
              onChange={handleSearchByProjectName}
            />
            <div className="absolute top-3 right-8">
              {" "}
              <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>{" "}
            </div>
          </div>
          <div className="searchHolder relative flex mb-3 mt-3 w-full">
            <input
              type="text"
              className="searchInput h-10 border-2 border-black pr-8 pl-5 rounded z-0 focus:shadow focus:border-red-800"
              placeholder="Search by AOR"
              onChange={handleSearchByAor}
            />
            <div className="absolute top-3 right-8">
              {" "}
              <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>{" "}
            </div>
          </div>
          <div className="searchHolder relative flex mb-3 mt-3 w-full">
            <input
              type="text"
              className="searchInput h-10 border-2 border-black pr-8 pl-5 rounded z-0 focus:shadow focus:border-red-800"
              placeholder="Search by Professor"
              onChange={handleHeadNameChange}
            />
            <div className="absolute top-3 right-8">
              {" "}
              <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>{" "}
            </div>
          </div>
        </div>
      </div>
      
      <div className="main-container mb-10">
        <Aside>
          <Label className="filterLabel">Filter By department</Label>
          <Field>
            <Select
              className="border-2 border-black focus:shadow focus:border-red-800"
              name="select"
              onChange={handleDepartmentChange}
              options={departments.map((item: any, key) => {
                return {
                  value: item.short_name,
                  label: item.full_name,
                };
              })}
            />
          </Field>
          <Button
            className="w-40 bg-red-800 text-white"
            onClick={() => {
              handleQuery();
            }}
          >
            Apply
          </Button>
        </Aside>
        <div className="results container-1 m-3 flex flex-auto justify-center">
          <div className="flex flex-wrap m-10">
            {researches.length ? showResearches() : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
