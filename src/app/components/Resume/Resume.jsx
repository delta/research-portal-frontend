import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import Pdf from 'react-to-pdf'
import "./Resume.css";
import Logo from "./imgs/logo.png"
import { backendurl } from "../../../env";

const scale = 2;
const width = 80;
const a4Ratio = 1.4142;
const ref = React.createRef(); 
const options = {
  orientation: 'p',
  unit: 'em',
  format: [width*scale, width*a4Ratio*scale],
};

const Resume = ()=>{
  const [profileData, setProfileData] = useState({});
    
  useEffect(() => {
    let url = `/admin_user/profile/?email=${localStorage.getItem("email")}`;
    axiosInstance
    .get(url)
    .then((res) => {
      setProfileData(res.data);
    })
    .catch((err) => console.log(err));
  }, []);
    
  let showProjects = () => {
    let mainSiteUrl = backendurl;
    let htmlArr = [];
    let allProjects = [];
    if (profileData.projects!==undefined) {
      profileData.projects.forEach((project) => {
        allProjects.push(project);
      });
    }
    if (profileData.non_admin_projects!==undefined) {
      profileData.non_admin_projects.forEach((project) => {
        allProjects.push(project);
      });
    }
    allProjects.forEach((project) => {
      let isHead = false;
      if (profileData.projects!==undefined && profileData.projects.indexOf(project) !== -1) {
        isHead = true;
      }
      if(project.hasOwnProperty("access"))
        project = project.data;
      let abstract = project.abstract.split(" ").slice(0, 25).join(" ");
      htmlArr.push(
        <div className="project-card p-4 px-8 w-full">
          {/* Project Card Header */}
          <div className="project-card-header flex items-center justify-between">
            {/* Name and designation*/}
            <span className="">
              <span className="text-xl pr-4 border-r-2 border-black font-bold">
                {project.name}
              </span>
              <span className="text-lg px-4">
                {isHead ? "Head":"Member"}
              </span>
            </span>
            
            {/* Web Link */}
            <div className="">
              <span 
                onClick={() => {
                  window.open(mainSiteUrl + "/project/" + project.id, '_blank');
                }}
                className="text-xl cursor-pointer text-blue-700 hover:text-red-500 pr-4 border-r-2 border-black"
              >
                Project Page
              </span>
              <span 
                onClick={() => {
                  window.open(project.paper_link, '_blank');
                }}
                className="text-xl cursor-pointer text-blue-700 hover:text-red-500 pl-4"
              >
                Paper
              </span>
            </div>
          </div>
          
          {/* Project Card Body  */}
          <div className="project-card-body mt-2 flex flex-col justify-between">
            {/* Custom tags */}
            <div className="flex flex-wrap">
              {
                project.tags.map((tag) => {
                  return (
                    <span className="text-sm px-4 py-1 mr-2 my-1 rounded-full text-white bg-blue-500">
                      {tag}
                    </span>
                  );
                })
              }
              {
                project.aor_tags.map((aor) => {
                  return (
                    <span className="text-sm px-4 py-1 mr-2 my-1 rounded-full text-white bg-red-500">
                      {aor.name}
                    </span>
                  );
                })
              }
            </div>
            
            {/* Abstract till 25 words */}
            <span className="text-xl"> {abstract}... </span>
          
            {/* Labs Tags */}
            {project.labs_tags.length > 0 ? 
              <div className="labs mt-2 flex items-center">
                <span className="text-xl">Lab Involved : </span>
                <div className="flex flex-wrap">
                  {
                    project.labs_tags.map((lab,index) => {
                      return <span
                        className={`text-lg text-red-700 px-4 my-1 border-r-${index + 1 === project.labs_tags.length?0:2} border-black`}>
                        {lab.name}
                      </span>
                    })
                  }
                </div>
              </div>
              :null
            }
            
            {/* Coe Tags */}
            {project.coe_tags.length > 0 ?
              <div className="coe mt-2 flex items-center">
                <span className="text-xl">Centers Of Excellence : </span>
                <div className="flex flex-wrap">
                  {
                    project.coe_tags.map((coe,index) => {
                      return <span
                        className={`text-lg text-red-700 px-4 my-1 border-r-${index + 1 === project.coe_tags.length?0:2} border-black`}>
                        {coe.name}
                      </span>
                    })
                  }
                </div>
              </div>
            :null}
          </div>
        </div>
      )
    });
    return htmlArr;
  }

  return (
    <div className="p-4 pb-20 flex flex-col items-center">
      {/* add a download button */}
      <div className="flex flex-col justify-center my-4">
        <Pdf 
          targetRef={ref} 
          filename="Resume.pdf" 
          options={options}
          scale={scale}
          >
            {({ toPdf }) => 
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={toPdf}
              >
                Download Resume
              </button>
            }
        </Pdf>
      </div>
      
      {/* check if profileData is empty object */}
      {Object.keys(profileData).length !== 0 ?
        <div ref={ref} className="resume border-2 shadow-xl border-black">
          {/* Head Section */}
          <div className="head-Section flex border-b-4 border-red-500">
            {/* Img div */}
            <div className="nitt-Logo flex justify-center items-center py-4 w-1/4">
              <img src={Logo}
              className="w-3/4"
              alt='Logo'
              >
              </img>
            </div>
            {/* Details Div */}
            <div className="details-div w-2/4 p-4">
              <div className="flex items-center py-4">
                <h1 className="text-4xl font-bold">{profileData.data.name}</h1>
              </div>
              <div className="flex items-center py-4">
                <span className="text-xl pr-4">E-mail : </span>
                <span className="text-xl">{profileData.data.email}</span>
              </div>
              <div className="flex items-center py-4">
                <span className="text-xl pr-4">Department : </span>
                <span className="text-xl ">{profileData.data.department.full_name}</span>
              </div>
            </div>
            {/* Profile Photo div */}
            <div className="profile-photo-div w-1/4 p-4 flex justify-center items-center border-black">
              <img src={profileData?.data.image_url} alt="User" className="w-3/4"/>
            </div>
          </div>

          {/* Body Section */}
          <div className="body-Section flex">
            
            {/* Left Section */}
            <div className="left-section border-r-2 py-4 px-2 border-black w-1/4">
              
              {/* Project Count Container */}
              <div className="project-count-container flex items-center py-4">
                <div className="w-1/2 flex flex-col border-r-2 border-red-500">
                  <span className="text-xl font-bold w-full text-center"> Head of </span>
                  <span className="w-full text-center"> {profileData?.projects.length} Projects</span> 
                </div>
                <div className="w-1/2 flex flex-col border-l-2 border-red-500">
                  <span className="text-xl font-bold w-full text-center"> Part of </span>
                  <span className="w-full text-center">
                    {profileData!==undefined?(profileData?.projects.length + profileData?.non_admin_projects.length):0} Projects 
                  </span>
                </div>
              </div>
              
              {/* Aor Container */}
              <div className="aor-container my-2">
                <h1 className="text-xl font-bold pb-2 border-b-2 border-red-500">
                  Areas Of Research
                </h1>
                <div className="px-1">
                  {
                    profileData?.aors.map((aor) => (
                      <div className="aor-item py-1">
                        <span className="text-lg">{aor.name}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
              
              {/* Labs Container */}
              <div className="labs-container mt-4 my-2">
                <h1 className="text-xl font-bold pb-2 border-b-2 border-red-500">
                  Labs Worked in
                </h1>
                <div className="px-1">
                  {
                    profileData?.labs.map((lab) => (
                      <div className="lab-item py-1">
                        <span className="text-lg">{lab.name}</span>
                      </div>
                    ))
                  }
                </div>
              </div>

              {/* Coes Container */}
              <div className="coes-container mt-4 my-2">
                <h1 className="text-xl font-bold pb-2 border-b-2 border-red-500">
                  Coes Worked in
                </h1>
                <div className="px-1">
                  {
                    profileData?.coes.map((coe) => (
                      <div className="coe-item py-1">
                        <span className="text-lg">{coe.name}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            
            </div>
            
            {/* Right Section */}
            <div className="right-section h-full flex flex-col w-3/4 justify-between">
              {/* Projects */}
              <div className="projects-container w-full mt-8">
                <h1 className="text-2xl font-bold pb-2 w-1/3 ml-4 px-2 border-b-4 border-red-500">
                  Projects
                </h1>
                <div className="flex flex-col project-card-container">
                  {showProjects()}
                </div>
              </div>
              
              {/* Footer */}
              <div className="footer w-full">
                <div className="flex justify-center border-t-2 border-black py-2 items-center">
                  <span className="w-2/12 border-t-2 mr-2 border-black h-0"></span>
                  <span className="text-lg font-bold w-2/4 text-center">
                    <a href="https://www.nitt.edu/" className="text-black">
                      National Institute of Technology Tiruchirappalli
                    </a>
                  </span>
                  <span className="w-2/12 border-t-2 ml-2 border-black h-0"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      :null}
    </div>
  )
}

export default Resume
