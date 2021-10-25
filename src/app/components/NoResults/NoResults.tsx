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

const NoResults = (props: any) => {
  const [user, setUser] = useState(false);
  const renderSwitch=() => {
    switch(props.flag) {
      case 0:
        return 'No projects set up yet';
        case 1:
          return 'No Professors registered yet';
          case 2:
            return 'No Labs registered yet';
            case 3:
              return 'No Centers of Excellence created yet';
               default:
                return null;
    }
  }

    return (
      <Container >
              <img className="object-contain h-60 w-full" src={notFound} alt="Project"></img>
              <h3 className="text-lg text-center font-semibold text-red-500 mb-2 ">{renderSwitch()}</h3>
      </Container>
    )

};

export default NoResults;
