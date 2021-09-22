import { useState, useEffect } from "react";

import styled from "styled-components";
import { Button } from 'tailwind-react-ui'
import {Link} from 'react-router-dom';
import notFound from './Assets/noresults.png'


const Container = styled.div`
  width: 80vw;
  height: 60vh;
  margin: 1rem;
  border-radius: 0.7rem;
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 40vw;
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

const ResearchCard1 = (props: any) => {
  const [user, setUser] = useState(false);
  if(props.flag==0)
    return (
      <Container >
              <img className="object-contain h-60 w-full" src={notFound} alt="Project"></img>
              <h3 className="text-lg text-center font-semibold text-red-500 mb-2 ">No Projects</h3>
              <h4 className="text-sm text-center font-sans text-gray-500 mb-2">Create new project</h4>

      </Container>
    )
    else if(props.flag==1)
    return (
      <Container >
              <img className="object-contain h-60 w-full" src={notFound} alt="Project"></img>
              <h3 className="text-lg text-center font-semibold text-red-500 mb-2 ">No Professors registered yet</h3>

      </Container>
    )
    else if(props.flag==2)
    return (
      <Container >
              <img className="object-contain h-60 w-full" src={notFound} alt="Project"></img>
              <h3 className="text-lg text-center font-semibold text-red-500 mb-2 ">No Labs registered yet</h3>

      </Container>
    )
    else 
    return (
      <Container >
              <img className="object-contain h-60 w-full" src={notFound} alt="Project"></img>
              <h3 className="text-lg text-center font-semibold text-red-500 mb-2 ">No Centers of Excellence created yet</h3>

      </Container>
    )

 
};

export default ResearchCard1;
