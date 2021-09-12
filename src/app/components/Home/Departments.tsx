import styled from "styled-components";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { useHistory } from "react-router";

const Container = styled.div`
  height: 27vh;
  width: 20vw;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.17),
    inset 2px 4px 7px rgba(255, 255, 255, 0.52);
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 40vw;
  }
  @media screen and (max-width: 768px) {
    width: 80vw;
  }
`;

const StyledImage = styled.img`
  transition: transform 1s;
  :hover {
    transform: scale(1.1, 1.1);
  }
`;

const DepartmentCard = (props: any) => {
  const history = useHistory();

  const handleClick = (shortName: String) => {
    let url = `/project/search?department=${shortName}&projectName=&headName=&aor=&lab=&coe=&tag=`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        console.log(res)
        history.push("/results", {data:res.data});
      })
      .catch((err: Error) => console.log(err));
  };

  return (
    <button
      onClick={() => {
        handleClick(props.data.short_name);
      }}
    >
      <Container className="rounded-2xl col-span-1 bg-yellow-200 lg:m-6 m-4 relative">
        <StyledImage
          className="h-full w-full rounded-2xl"
          src={`${props.data.image_url}`}
          alt="dummy"
        />
        <div className=" absolute bottom-0 h-2/5 w-full bg-gray-400 bg-opacity-50 hover:bg-opacity-80 lg:p-4 md:p-3 p-2">
          <p className="lg:text-2xl md:text-xl text-lg font-bold">
            {props.data.short_name}
          </p>
          <p className="lg:text-sm md:text-sm text-xs pb-4">
            {props.data.full_name}
          </p>
        </div>
      </Container>
    </button>
  );
};

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    let url = `/department`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setDepartments(res.data.data);
      })
      .catch((err: Error) => console.log(err));
  }, []);

  const getDepartmentCards = () => {
    let htmlArr: JSX.Element[] = [];
    departments.forEach((dept, index) => {
      htmlArr.push(<DepartmentCard data={dept} key={index} />);
    });
    return htmlArr;
  };

  return (
    <div className="w-screen bg-red-800" style={{ minHeight: "85vh" }}>
      <div className=" w-full col-span-2 lg:p-14 md:p-8 p-6 flex justify-center items-start flex-col">
        <p className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl text-red-100 border-b-2 border-gray-100 pb-3 font-bold">
          Departments
        </p>
      </div>
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-items-center lg:p-14 md:p-8 p-6">
        {departments.length ? getDepartmentCards() : null}
      </div>
    </div>
  );
};

export default Departments;
