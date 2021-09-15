import React, { useEffect, useState } from "react";
import "./Profile.css";
import { axiosInstance } from "../../utils/axios";
import {
  ProfileData,
} from "../../interfaces/profile";
import ProjectCard from "./ProjectCard";
import HorizontalFilterBar from "./HorizontalFilterBar";
import { useParams } from "react-router";
import styled from "styled-components";

const Container = styled.div`
  width: 15vw;
  margin: 1rem;
  border-radius: 0.7rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 40vw;
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
  &:hover{
    background-color: #FFF1F1;
    border: 0.06rem solid red;
  }
`;

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData>();

  /*function to render lab card*/
  const labCards = () => {
    let labs = profileData?.labs;
    let htmlArr: JSX.Element[] = [];
    labs?.forEach((lab, index) => {
      htmlArr.push(
        <Container key={index}>
          <div className="transition duration-450 ease-in-out transform hover:-translate-y-1 hover:scale-105  ">
          <div className="p-5">
            <div>
              <img className="rounded mb-6 h-40 w-full" src={lab.image_url} alt="Project"></img>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-500 mb-2 ">{lab.name}</h3>
                <h5 className="text-sm font-semibold mb-2 break-all truncate">
                  {lab.description}
                </h5>
            </div>
          </div>
          </div>
      </Container>
      );
    });
    return htmlArr;
  };

  useEffect(() => {
    let url = `/admin_user/profile/?email=${localStorage.getItem('email')}`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        res.data.filteredProjects = res.data.projects;
        res.data.filteredNon_admin_projects = res.data.non_admin_projects;
        setProfileData(res.data);
      })
      .catch((err: Error) => console.log(err));
  }, []);

  return (
    <div className="min-w-full mb-10 sm:mb-20 p-0 m-7">
      <div className="flex flex-row flex-wrap justify-content-sm-start">
        
        {/* Profile Info Area */}
        <div className="w-1/4 h-full profile-info">
          <div className="overflow-hidden rounded-lg shadow-lg flex flex-col sm:flex-row lg:flex-col">
            <div className="w-full sm:w-1/3 lg:w-full">
              <img alt="Placeholder" className="block h-auto w-full"
              src={`${profileData?.data.image_url}`}
              ></img>
            </div>
            <div className="w-full sm:w-2/3 lg:w-full">
              <header className="flex items-center border-b-2 border-black justify-between leading-tight p-2 ">
                <h1 className="text-3xl fond-bold">
                  {profileData?.data.name}
                </h1>
              </header>
              <div className="flex flex-col p-2 pr-4">
                <div className="text-lg flex justify-between my-2 w-full">
                  <span className="text-xl">Email</span>
                  <span className="">
                    {profileData?.data.email}
                  </span>
                </div>
                <div className="text-lg flex justify-between my-2 w-full">
                  <span className="text-xl">Department</span>  
                  <span className="">
                    {profileData?.data.department.short_name}
                  </span>
                </div>
                <div className="text-lg flex justify-between my-2 w-full">
                  <span className="text-xl">Projects</span>  
                  <span className="">
                    {profileData!==undefined? profileData.filteredProjects.length : "Loading"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project and Cards Area */}
        <div className="w-full cards-container text-center flex flex-col">
          
          {/* Projects Div */}
          {profileData?.projects.length ? (
            <div className="mt-0 sm:w-full">
              <p className="xl:text-4xl lg:text-3xl md:text-3xl text-xl mb-3 lg:mt-0 mt-6 sm:mb-0 text-red-800 font-bold">
                Projects
              </p>
              <HorizontalFilterBar 
                profileData={profileData}
                setProfileData={setProfileData}
              />
              <div className="flex flex-wrap justify-around">
                {profileData.filteredProjects.map((item, key) => {
                  return <ProjectCard data={item} key={key} />;
                })}
                {profileData.filteredNon_admin_projects.map((item, key) => {
                  return <ProjectCard data={item} key={key} />;
                })}
              </div>
            </div>
          ) : null}

          {/* Labs Div */}
          {profileData?.labs.length ? (
            <div className="mt-4 sm:w-full">
              <div>
                <p className="xl:text-4xl lg:text-3xl md:text-2xl text-xl mb-3 sm:mb-0 text-red-800 font-bold">
                  Labs
                </p>
                <div className="flex flex-wrap justify-around">
                  {labCards()}
                </div>
              </div>
            </div>
          ) : null}
      
        </div>
      
      </div>
    </div>
  );
};

export default Profile;
