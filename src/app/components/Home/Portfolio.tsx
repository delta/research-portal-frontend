import { useState } from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  transition: transform 1s;
  width: 400px;
  height: 400px;
  :hover {
    transform: scale(1.1, 1.1);
  }
`;

const Academics = (props:any) => {
  return (
    <div>
      <p className="lg:text-xl md:text-lg text-sm text-gray-800 mt-3">
        Academic Qualifications :
      </p>
      <ul className="lg:text-lg md:text-md text-xs text-gray-200 flex flex-col grid justify-items-start">
        {props.data.map((qualification: String) => {
          return (<li className="mt-3 text-left">{qualification}</li>);
        })}
      </ul>
    </div>
  );
}
const ResearchInterests = (props: any) => {
  return (
    <div>
      <p className="lg:text-xl md:text-lg text-sm text-gray-800 mt-3">
        Research Interests :
      </p>
      <ul className="lg:text-lg md:text-md text-xs text-gray-200 text-left flex flex-col grid justify-items-start">
        {props.data.map((interest: String) => {
          return (<li className="mt-3 text-left">{interest}</li>);
        })}
      </ul>
    </div>
  );
}
const PortfolioCard = (props: any) => {
  return (
    <div className='flex flex-row mt-5 mb-8 pt-3 w-full'>
      <div className="h-full w-full md:col-span-1 col-span-1 md:mb-0 mb-6">
        <StyledImage
          className="md:h-1/2 rounded-md mt-20 max-h-96 max-w-7xl"
          src={`${props.data.image_url}`}
          alt="dummy"
        />
      </div>
      <div className="w-full md:col-span-3 col-span-5 mx-0 flex flex-col">
        <p className="xl:text-4xl lg:text-2xl md:text-xl text-lg text-red-100 pb-3 font-bold">
          {props.data.name}
        </p>
          <Academics data={props.data.acad} />
          <ResearchInterests data={props.data.res} />
      </div>
    </div>
  );
}

const Portfolio = () => {
  let pfs = [
    {
      image_url: 'https://www.nitt.edu/home/academics/departments/meta/faculty/smuthu/smuthu_new.jpg',
      name: 'Dr.S.Muthukumaran - Dean(R&C)',
      acad: ['Ph.D. (Engineering) Birla Institute of Technology, Mesra, Ranchi', 'M.E. (Welding Engineering) Regional Engineering College, Tiruchirappalli'],
      res: ['Welding Engineering', 'Manufacturing technology', 'Non-Destructive Testing', 'Materials Science']
    },
    {
      image_url: 'https://www.nitt.edu/home/academics/departments/mech/faculty/r_anand/DSC00732.JPG',
      name: 'Dr.R.Anand - AD(Industry and R&D Colloboration, R&C)',
      acad: ['Ph.D. (ICE, Mechanical Engineering) Anna University, Chennai', 'M.Tech (Energy and Conservation Management) School of Energy, Bharadhidasan University'],
      res: ['Thermodynamics','Fuels and Combustion','Basic Mechanical Engineering','Thermal Engineering','Energy Engineering']
    },
    {
      image_url: 'https://www.nitt.edu/home/academics/departments/physics/faculty/Santhosh/santhosh.jpg',
      name: 'Dr.M.C.Santhosh Kumar - AD(Research Services, R&C)',
      acad: ['Ph.D. (Thin Films) Cochin University of Science and Technology, Kochi, Kerala', 'M.Sc. (Physics) Pondicherry University, Pondicherry'],
      res: ['Thin Film Voltaics', 'Optoelectronic Devices']
    },
    {
      image_url: 'https://www.nitt.edu/home/academics/departments/civil/faculty/vs/Sunitha.jpg',
      name: 'Dr.V.Sunitha - AD(Research and Consultancy,R&C)',
      acad: ['Ph.D. (Transportation Engineering)', 'M.E. (Traffic and Transportation Planning)'],
      res: ['Transportation Engineering', 'Highway Engineering']
    }
  ];
  const [portfolios, setPortfolios] = useState(pfs);

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