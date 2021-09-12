import React, { useEffect, useState } from "react";
import "./Profile.css";
import { axiosInstance } from "../../utils/axios";
import { Link } from "react-router-dom";
import img from "../Professors/Assets/icon.jpg";
import styled from "styled-components";
import CustomTagInput from "../CreateProject/CustomTagInput";
import {
  ProfileData,
} from "../../interfaces/profile";

const Container = styled.div`
  margin: 1rem;
  height: 35vh;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 40vw;
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

const StyledImage = styled.img`
  padding: 1rem;
  width: 20vw;
  transition: transform 1s;
  :hover {
    transform: scale(1.1, 1.1);
  }
`;

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData>();
  const [user, setUser] = useState({
    id: 0,
    name: "",
    password: "",
    last_login: "",
    is_superuser: false,
    email: "",
    is_staff: false,
    dept: 0,
    is_verified: false,
    groups: [],
    user_permissions: [],
    image_url: "",
    department: {
      id: 0,
      full_name: "",
      short_name: "",
      image_url: "",
    },
  });
  const [scholar, setScholars] = useState([]);
  const [aors, setAors] = useState([{}]);
  const [coes, setCoes] = useState([
    {
      id: null,
      department: "",
      name: "",
      description: "",
      image_url: "",
    },
  ]);
  const [labs, setLabs] = useState([
    {
      id: null,
      department: "",
      name: "",
      description: "",
      image_url: "",
    },
  ]);
  const [non_admin_projects, setNonAdminProjects] = useState([
    {
      id: null,
      department: "",
      name: "",
      description: "",
      image_url: "",
    },
  ]);
  const [projects, setProjects] = useState([
    {
      name: "",
      email: "",
      image_url: "",
      is_staff: "",
      department: {
        full_name: "",
        id: null,
        short_name: "",
        image_url: "",
      },
      id: null,
      abstract: "",
      paper_link: "",
      members: [{ name: "", permission: "", image_url: "", email: "" }],
      tags: [],
      head: {
        name: "",
        email: "",
        is_staff: "",
        image_url: "",
      },
      aor_tags: [
        {
          id: null,
          name: "",
          description: "",
          department: "",
        },
      ],
      labs_tags: [
        {
          id: null,
          name: "",
          image_url: "",
          description: "",
          department: "",
        },
      ],
      coe_tags: [
        {
          id: null,
          name: "",
          description: "",
          department: "",
          image_url: "",
        },
      ],
    },
  ]);

  const [customTags, setCustomTags] = useState<Array<string>>([]);

  const ProjectCard = (props: any) => {
    console.log(props);
    let project = {
      members: [
        {
          name: "Scholar 1",
          image_url:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png",
          permission: "edit",
        },
        {
          name: "Scholar 2",
          image_url:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png",
          permission: "edit",
        },
        {
          name: "Scholar 3",
          image_url:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png",
          permission: "edit",
        },
        {
          name: "Scholar 4",
          image_url:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png",
          permission: "edit",
        },
      ],
    };
    let tags = ["Tag1", "Tag2", "Tag3", "Tag4"];
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-xl p-4">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src="https://i.pinimg.com/originals/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
              alt="Man looking at item at a store"
            />
          </div>
          <div className="p-8 pt-0">
            <div className="uppercase tracking-wide xl:text-2xl lg:text-lg md:text-sm text-xs text-red-800 font-bold">
              Case study
            </div>
            {tags.map((item, key) => {
              return (
                <span
                  key={key}
                  className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-red-800 text-white uppercase last:mr-0 mr-1"
                >
                  {item}
                </span>
              );
            })}
            <p className="mt-2 text-black h-24 truncate whitespace-pre-line">
              Getting a new business off the ground is a lot of hard work. Here
              are five ideas you can use to find your first customers.{" "}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const labCards = () => {
    let htmlArr: JSX.Element[] = [];
    labs.forEach((lab, index) => {
      htmlArr.push(
        <div
          className="m-4 p-4"
          style={{
            height: "40rem",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <img
            src={`${lab.image_url}`}
            alt="Example image"
            className="h-96"
          ></img>
          <div className="flex flex-col m-2">
            <div className="overflow-y-scroll h-52 p-4 pb-10">
              <h1 className="text-3xl font-bold">{lab.name}</h1>
              <p>{lab.description}</p>
            </div>
          </div>
        </div>
      );
    });
    return htmlArr;
  };

  useEffect(() => {
    let url = `/admin_user/profile/?email=${localStorage.getItem("email")}`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        console.log(res.data);
        // setUser(res.data.data);
        // setAors(res.data.aors);
        // setLabs(res.data.labs);
        // setNonAdminProjects(res.data.non_admin_projects);
        // setProjects(res.data.projects);
        // setCoes(res.data.coes);
        // setScholars(res.data.scholars);
        // console.log(res);
        // console.log(labs, aors, coes, non_admin_projects, projects);
        setProfileData(res.data);
        console.log(profileData);
      })
      .catch((err: Error) => console.log(err));
  }, []);

  return (
    <div className="flex flex-col items-center mt-5 mb-10 sm:mb-20 sm:mt-20 p-0 sm:p-2 m-7">
      <div className="flex flex-col items-center sm:flex-row antialiased rounded-lg border shadow-lg p-3 sm:p-10 sm:w-9/12">
        <div>
          <img
            className="w-32 max-h-32 mb-4 sm:mb-0"
            src={img}
            alt="Professor"
          ></img>
        </div>
        <div className="flex-1 text-center sm:text-left h-auto sm:pl-12">
          <h3 className="text-lg font-semibold mb-2">Name</h3>
          <h3 className="text-lg font-semibold mb-2">Department</h3>
          <p className="text-left">Some text here.</p>
        </div>
      </div>
      <div className="min-w-full mt-5 mb-10 sm:mb-20 sm:mt-20 p-0 sm:p-2 m-7">
        <div className="flex flex-col md:flex-row justify-content-sm-start w-full h-full">
          <div className="flex flex-col sm:mr-5 antialiased rounded-lg border shadow-lg p-3 sm:p-10 sm:w-3/12 sm:min-h-full">
            <h3 className="text-lg font-semibold mb-2"> Filter Projects</h3>
            <div className="searchHolder w-full relative flex mb-3 mt-3 w-full">
              <input
                type="text"
                className="searchInput w-full h-10 border-2 border-black pr-8 pl-5 rounded z-0 focus:shadow focus:border-red-800"
                placeholder="Search by Name"
              />
              <div className="absolute top-3 right-8">
                {" "}
                <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>{" "}
              </div>
            </div>
            <CustomTagInput tags={customTags} setTags={setCustomTags} />
            <button className="w-px-50 rounded-md h-10 bg-red-800 text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Apply
            </button>
          </div>
          <div className="w-full text-center flex flex-col">
            <p className="xl:text-4xl lg:text-3xl md:text-2xl text-xl mb-3 sm:mb-0 text-red-800 font-bold">
              Projects
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:p-3 mt-0 sm:w-full">
              {projects.length ? (
                <div>
                  <p className="xl:text-4xl lg:text-3xl md:text-2xl text-xl mb-3 sm:mb-0 text-red-800 font-bold">
                    Projects
                  </p>
                  {projects.map((item, key) => {
                    <ProjectCard data={item} key={key} />;
                  })}
                </div>
              ) : null}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:p-3 mt-0 sm:w-full">
              {labs.length ? (
                <div>
                  <p className="xl:text-4xl lg:text-3xl md:text-2xl text-xl mb-3 sm:mb-0 text-red-800 font-bold">
                    Labs
                  </p>
                  {labCards()}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
