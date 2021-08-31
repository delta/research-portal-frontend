import React, { useEffect, useState } from "react";
import {
  Select,
  Field,
  Label,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Article,
  ContentTitle,
  Text,
  Aside,
} from "tailwind-react-ui";
import "./Professor.css";
import img from "./Assets/icon.jpg";
import { axiosInstance } from "../../utils/axios";
import styled from "styled-components";

const Container = styled.div`
  width: 15vw;
  margin: 1rem;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.17),
    inset 2px 4px 7px rgba(255, 255, 255, 0.52);
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 40vw;
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

const StyledImage = styled.img`
  transition: transform 1s;
  :hover {
    transform: scale(1.1, 1.1);
  }
`;

const ProfessorCard = (props: any) => {
  return (
    // <a href={`https://www.nitt.edu/home/academics/departments/${props.data.short_name}/`}>
    <div className="flex flex-wrap m-5">
      <Container className="rounded-2xl col-span-1 bg-yellow-200 lg:m-6 m-4 relative">
        <StyledImage
          className="w-full rounded-2xl h-44"
          src={"https://www.nitt.edu/home/administration/chairperson/BB.jpg"}
          alt="dummy"
        />
        <div className=" absolute bottom-0 h-2/5 w-full bg-gray-400 bg-opacity-50 hover:bg-opacity-80 lg:p-4 md:p-3 p-2">
          <p className="lg:text-2xl md:text-xl text-lg font-bold">
            {props.data.name}
          </p>
          <p className="lg:text-sm md:text-sm text-xs mb-4">
            {props.data.email}
          </p>
        </div>
      </Container>
    </div>
    // </a>
  );
};

const Professor = () => {
  const [professors, setProfessors] = useState([{ name: "", description: "" }]);
  const [searchName, setSearchName] = useState("");

  const getProfessors = () => {
    let url = `/admin_users`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setProfessors(res.data.data);
      })
      .catch((err: Error) => console.log(err));
  };
  useEffect(() => {
    getProfessors();
  }, []);

  const showProfessors = () => {
    return professors.map((item, key) => {
      return <ProfessorCard data={item} key={key} />;
    });
  };

  const handleQuery = () => {
    console.log(searchName);
    let url = `/admin_user/search?professor=${searchName}`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setProfessors(res.data.data);
        console.log(professors)
      })
      .catch((err: Error) => console.log(err));
  };

  const handleSearchByProfessorName = (e: any) => {
    setSearchName(e.target.value);
    console.log(searchName);
    
    handleQuery();
  };

  return (
    <div className="wrapper">
      <div className="grid justify-items-end m-3">
        <div className="searchHolder relative flex w-200 mb-3">
          {" "}
          <input
            type="text"
            className="searchInput h-10 border-2 border-black pr-8 pl-5 rounded z-0 focus:shadow focus:border-red-800"
            value={searchName}
            onChange={handleSearchByProfessorName}
            placeholder="Search"
          />
          <div className="absolute top-4 right-3">
            {" "}
            <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>{" "}
          </div>
        </div>
      </div>
      <div className="main-container mb-10">
        <div className="results container-1 m-3 flex flex-auto justify-center">
          <Row gutter className="md:h-full">
            {professors.length ? showProfessors() : null}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Professor;
