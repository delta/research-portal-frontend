import { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../../utils/axios";
import { useHistory } from "react-router";

const Container = styled.div`
  min-width: 45vw;
  box-shadow: -4.95575px -3.9646px 9.9115px rgba(0, 0, 0, 0.1),
    4.95575px 3.9646px 9.9115px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 991px) {
    min-width: 80vw;
  }
`;

const ScrollContainer = styled.div`
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledImage = styled.img`
  transition: transform 1s;
  :hover {
    transform: scale(1.1, 1.1);
  }
`;

const AreaOfResearchCard = (props:any) => {
  const history = useHistory();

  const handleClick = (aor: String) => {
    history.push(`/results/aor/${aor}`)
  };
  // Temp frontend obj to store urls
  const Urls = [
    "https://i.ibb.co/1MdCGY0/image.png",
    "https://siemenscoe.nitt.edu/images/lab/robotics-lab/Robotics-Lab2.jpg",
    "https://png.pngtree.com/png-vector/20190130/ourlarge/pngtree-2-5d-blockchain-matrix-5dscience-fictionblockchaintechnologyenergy-png-image_656119.jpg"
  ]
  return (
    
    <Container className="lg:m-6 m-4 grid md:grid-cols-5 grid-cols-1 rounded-lg">
      <StyledImage
        src={
          `${Urls[props.data.id - 1]}`
        }
        alt="dummy"
        className="md:col-span-2 col-span-1 h-full w-full rounded-lg"
      />
      <div className="md:col-span-3 col-span-1 flex justify-between items-start flex-col h-full w-full lg:p-8 md:p-6 p-4">
      <button onClick={()=>{handleClick(props.data.name)}}>
        <p className="xl:text-4xl lg:text-3xl md:text-2xl text-xl mb-3 sm:mb-0 text-red-800 font-bold">
          {props.data.name}
        </p>
        
        <p className="xl:text-xl lg:text-lg md:text-sm text-xs mb-3 sm:mb-0">
         {props.data.description}
        </p>
        </button>
        {/* <p className="xl:text-2xl lg:text-lg md:text-sm text-xs mb-3 sm:mb-0 text-red-800 hover:text-red-600">
          Read More -&gt;
        </p> */}
      </div>
    </Container>
  );
};

const AreaOfResearch = () => {
  const [aors, setaors] = useState([]);

  useEffect(() => {
    let url = `/aor`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setaors(res.data.data);
      })
      .catch((err: Error) => console.log(err));
  }, []);

  const getaorsCards = () => {
    let htmlArr: JSX.Element[] = [];
    aors.forEach((aor, index) => {
      htmlArr.push(<AreaOfResearchCard data={aor} key={index} />);
    });
    return htmlArr;
  };
  return (
    <div className="w-screen bg-red-50" style={{ minHeight: "85vh" }}>
      <div className=" w-full col-span-2 lg:p-14 md:p-8 p-6 flex justify-aor items-start flex-col">
        <p className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl text-gray-800 border-b-2 border-gray-400 pb-3 font-bold">
          Area of Research
        </p>
      </div>
      <ScrollContainer className="h-full overflow-x-scroll flex  flex-row lg:p-14 md:p-8 p-6">
      {aors.length?getaorsCards():null}
      </ScrollContainer>
    </div>
  );
};

export default AreaOfResearch;
