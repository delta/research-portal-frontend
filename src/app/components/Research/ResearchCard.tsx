import { useState, useEffect } from "react";
import "./Research.css";
import { axiosInstance } from "../../utils/axios";
import { Link } from "react-router-dom";
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
  &:hover {
    background-color: #fff1f1;
    border: 0.06rem solid red;
  }
`;

const ResearchCard = (props: any) => {
  const [user, setUser] = useState(false);
  const getUserPrivilege = () => {
    let url = `/user/is_staff/`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        if (res.data.data == "Admin") setUser(true);
      })
      .catch((err: Error) => console.log(err));
    url = `/admin_user/search/?professor=${localStorage.getItem("email")}`;
  };
  useEffect(() => {
    getUserPrivilege();
  }, []);
  if (!user)
    return (
      <Container>
        <div className="transition duration-450 ease-in-out transform hover:-translate-y-1 hover:scale-105  ">
          <div className="p-5">
            <Link to={`/project/${props.data.id}`}>
              <div>
                <img
                  className="rounded mb-6 h-40 w-full"
                  src={props.data.image_url}
                  alt="Project"
                ></img>
              </div>
            </Link>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-500 mb-2 ">
                {props.data.name}
              </h3>
              <h5 className="text-sm font-semibold mb-2 break-all">
                <a className="text-blue-700 cursor-pointer" href={props.data.paper_link}>Paper Link</a>
              </h5>
            </div>
          </div>
        </div>
      </Container>
    );
  else
    return (
      <Container>
        <div className="p-5">
          <div>
            <img
              className="mb-6 h-40 w-full"
              src={props.data.image_url}
              alt="Project"
            ></img>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{props.data.name}</h3>
            <h5 className="text-sm font-semibold mb-2 break-all">
              <a className="text-blue-700 cursor-pointer" href={props.data.paper_link}>Paper Link</a>
            </h5>
          </div>
        </div>
      </Container>
    );
};

export default ResearchCard;
