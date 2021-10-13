import { useState } from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  width: 400px;
  height: 400px;
  @media(max-width: 768px){
    height: 250px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 85vw;
  }
`;
const PortfolioCard = (props: any) => {
  return (
    <div className='flex md:flex-row flex-col flex-wrap mt-5 mb-8 pt-3 pl-2 w-full bg-red-900 md:rounded-2xl rounded-lg md:shadow-2xl shadow-lg'>
      <div className="w-max cols-span-1">
        <StyledImage
          className="md:h-1/2 md:mx-10 md:my-3 rounded-md max-h-96 max-w-7xl"
          src={props.data.image}
          alt="dummy"
        />
      </div>
      <div className="mt-5 md:mt-10 md:pl-48 text-red-100">
        <p className="xl:text-4xl lg:text-3xl md:text-xl text-lg pb-3 font-bold">
          {props.data.name}
        </p>
        <p className="xl:text-3xl lg:text-xl md:text-lg text-md pb-3 font-bold">
          {props.data.designation}
        </p>
        <p className="xl:text-xl lg:text-lg md:text-md text-sm pb-3 font-bold md:mt-20 mt-5">
          Department: {props.data.department}
        </p>
        <p className="xl:text-xl lg:text-lg md:text-md text-sm pb-3 font-bold">
          Contact: {props.data.email}
        </p>

      </div>
    </div>
  );
}

const Portfolio = () => {
  const deansInfo = [
  {
    name: "Dr. S. Muthukumaran",
    designation: "Dean Research & Consultancy",
    department: "Metallurgical and Materials Engineering",
    email: "smuthu@nitt.edu",
    image: "https://www.nitt.edu/home/academics/departments/meta/faculty/smuthu/smuthu_new.jpg",
  }, 
  {
    name: "Dr. R. Anand",
    designation: "Associate Dean (Industry and R&D Collaboration)",
    department: "Mechanical Engineering",
    email: "anandachu@nitt.edu",
    image: "https://www.nitt.edu/home/academics/departments/mech/faculty/r_anand/DSC00732.JPG",
  }, 
  {
    name: "Dr. M. C. Santhosh kumar",
    designation: "Associate Dean (Research Services)",
    department: "Department of Physics",
    email: "santhoshmc@nitt.edu",
    image: "https://www.nitt.edu/home/academics/departments/physics/faculty/Santhosh/santhosh.jpg",
  }, 
  {
    name: "Dr. V. Sunitha",
    designation: "Associate Dean (Research & Consultancy)",
    department: "Civil Engineering",
    email: "sunitha@nitt.edu",
    image: "https://www.nitt.edu/home/academics/departments/civil/faculty/vs/Sunitha.jpg",
  }];
  const [portfolios, setPortfolios] = useState(deansInfo);

  const getPortfolios = () => {
    let htmlArr: JSX.Element[] = [];
    portfolios.forEach((portfolio, index) => {
      htmlArr.push(<PortfolioCard data={portfolio} />);
    });
    return htmlArr;
  }
  return (
    <div className="w-screen bg-red-800" style={{ minHeight: "85vh" }}>
      <div className="w-full lg:p-14 md:p-8 p-6 flex justify-center items-start flex-col">
        <p className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl text-red-100 border-b-2 border-gray-100 pb-3 font-bold">
          Dean R&C
        </p>
        {portfolios.length ? getPortfolios() : null}
      </div>
    </div>
  )
}

export default Portfolio;