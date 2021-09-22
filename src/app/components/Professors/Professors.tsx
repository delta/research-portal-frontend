import React, { useEffect, useState } from "react";
import {
  Row
} from "tailwind-react-ui";
import "./Professor.css";
import { axiosInstance } from "../../utils/axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import NoResults from '../NoResults/NoResults' ;

const Container = styled.div`
  width: 16vw;
  height: 20vw;
  margin: 1rem;
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 32vw;
    height: 40vw;
  }
  @media screen and (max-width: 768px) {
    width: 48vw;
    height: 60vw;
  }
`;

const StyledImage = styled.img`
  width: 16vw;
  height: 20vw;
  transition: transform 1s;
  :hover {
    transform: scale(1.05, 1.05);
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 32vw;
    height: 40vw;
  }
  @media screen and (max-width: 768px) {
    width: 48vw;
    height: 60vw;
  }
`;

const ProfessorCard = (props: any) => {
  return (
    <div className="flex flex-wrap m-5 text-center">
      <Link to={`/professors/${props.data.email!=undefined?props.data.email.split("@")[0]:""}`}>
        <Container className="rounded-2xl col-span-1 bg-grey lg:m-6 m-4 relative">
          <StyledImage
            className="w-full rounded-2xl h-44 image"
            src={props.data.image_url}
            alt="dummy"
          />
          <div className="bg-gray-400 bg-opacity-75 lg:p-4 md:p-3 p-2 info">
            <p className="lg:text-2xl md:text-xl text-lg font-bold name">
              {props.data.name}
            </p>
            <p className="lg:text-sm md:text-sm text-xs mb-4 email">
              {props.data.email}
            </p>
          </div>
        </Container>
      </Link>
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
  const noResult = ()=>{
    return (
      <NoResults flag={1}/>
    );
};


  const handleQuery = () => {
    let url = `/admin_user/search?professor=${searchName}`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setProfessors(res.data.data);
      })
      .catch((err: Error) => console.log(err));
  };

  const handleSearchByProfessorName = (e: any) => {
    setSearchName(e.target.value);
    
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
          <Row gutter className="md:h-full justify-center">
            {professors.length ?  noResult() : noResult()}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Professor;
