import styled from "styled-components";
import { useEffect, useState } from 'react';
import { axiosInstance } from "../../utils/axios";
import { useHistory } from "react-router";

const Container = styled.div`
  height: 50vh;
  width: 30vw;
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 60vw;
  }
  @media screen and (max-width: 768px) {
    width: 80vw;
  }
`;

const StyledImage = styled.img`
transition: transform 1s;
:hover{
  transform: scale(1.1,1.1);
}
`;

const CentersCard = (props:any) => {
  const history = useHistory();
  const handleClick = (name: String) => {
    history.push(`/results/coe/${name}`)
  };

  return (
    <button onClick={() => {
            handleClick(props.data.name);
          }}>
      <Container className="bg-red-300 lg:m-6 m-4 rounded-2xl relative">
        <StyledImage
          src={`${props.data.image_url}`}
          alt="dummy"
          className="h-full w-full rounded-2xl"
        />
        <div className="h-1/4 w-full top-3/4 bg-red-800 bg-opacity-50 hover:bg-opacity-70 absolute flex justify-center items-center">
          <p className=" lg:text-2xl md:text-xl text-lg text-red-200 font-bold">
            {props.data.name}
          </p>
        </div>
      </Container>
    </button>
  );
};

const Centers = () => {

  const [centers, setcenters] = useState([{image_url:''}]);

  useEffect(() => {
    let url = `/coe`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setcenters(res.data.data);
      })
      .catch((err: Error) => console.log(err));
  }, []);

  const getCentersCards = ()=>{
    let htmlArr: JSX.Element[] = [];
    centers.forEach((center,index)=>{
      if(center.image_url)
        htmlArr.push(<CentersCard data={center} key={index}/>)
    });
    return htmlArr;
  }


  return (
    <div className="w-screen bg-red-50" style={{ minHeight: "85vh" }}>
      <div className=" w-full col-span-2 lg:p-14 md:p-8 p-6 flex justify-center items-start flex-col">
        <p className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl text-gray-800 border-b-2 border-gray-400 pb-3 font-bold">
          Centers@NITT
        </p>
      </div>
      <div className="h-full grid lg:grid-cols-3 md:grid-cols-1 justify-items-center lg:p-14 md:p-8 p-6">
        {centers.length ? getCentersCards() : null}
      </div>
    </div>
  );
};

export default Centers;
