import React, { useState, useEffect } from 'react';
import { Select, Field, Label, Row, Col, Card, CardBody, Button, Article, ContentTitle, Text, Aside } from 'tailwind-react-ui'
import './Research.css'
import img from './Assets/icon.jpg';
import { axiosInstance } from "../../utils/axios";
import {Link} from 'react-router-dom';
import ResearchCard from "./ResearchCard";

const Research = () => {
  const [user,setUser] = useState("admin");

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
        console.log(res.data.data);
      })
      .catch((err: Error) => console.log(err));
  }


  useEffect(() => {
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

  const handleAorChange = (e: any) => {
    setAor(e.target.value);
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
        console.log("wait what");
      })
      .catch((err: Error) => console.log(err));
  };

  const handleSearchByProjectName = (e: any) => {
    setSearchName(e.target.value);
  };


  return(
    <div className="wrapper">
      <div className="flex justify-start">
        <Link to='/my-research' className="m-3"><Button className="w-40 bg-red-800 text-white">My Research</Button></Link>
        <Link to='/create-project' className="m-3"><Button className="w-60 bg-red-800 text-white">Create Project</Button></Link>
      </div>
      <div className="flex-1">
        <div className="grid justify-items-end m-3">
          <div className="searchHolder relative flex w-200 mb-3"> 
            <input type="text" className="searchInput h-10 border-2 border-black pr-8 pl-5 rounded z-0 focus:shadow focus:border-red-800" placeholder="Search"
            onChange={handleSearchByProjectName}/>
            <div className="absolute top-4 right-3"> <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> </div>
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
              options={ departments.map((item:any, key) => {
                return {
                  value: item.short_name,
                  label: item.full_name
                }
              })
            }
            />
          </Field>
          <Button className="w-40 bg-red-800 text-white" onClick={()=>{handleQuery()}}>Apply</Button>
        </Aside>
        <div className="results container-1 m-3 flex flex-auto justify-center">
          <Row gutter className="md:h-full">
            {researches.length?showResearches():null}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Research;
