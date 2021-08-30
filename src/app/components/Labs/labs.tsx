import React, { useState, useEffect } from "react";
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
import { axiosInstance } from "../../utils/axios";
import "./labs.css";

const Lab = () => {
  let img =
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
  
  const [labs, setLabs] = useState([{name:"",description:"",image_url:""}]);

  useEffect(() => {
    let url = `/center`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setLabs(res.data.data);
      })
      .catch((err: Error) => console.log(err));
  }, []);

  const getLabs = ()=>{
    let htmlArr: JSX.Element[] = [];
    labs.forEach((lab,index)=>{
      htmlArr.push(
        <Col
          w={{
            def: "full",
            sm: "1/1",
            md: "1/2",
            lg: "1/3",
            xl: "1/3",
          }}
          h="h-full"
          key={index}
        >
          <Card border shadow maxW="sm" className="overflow-y-scroll m-4" style={{height:"40rem"}}>
            <img src={`${lab.image_url}`} alt="Example image" />
            <CardBody>
              <Article>
                <ContentTitle size={5}>{lab.name}</ContentTitle>
                <Text is="p">{lab.description}</Text>
              </Article>
            </CardBody>
          </Card>
        </Col>
      );
    });
    return htmlArr;
  };

  return (
    <div className="wrapper">
      <div className="grid justify-items-end m-3"></div>
      <div className="main-container mb-10">
        <div className="results container-1 m-3 flex flex-auto justify-center">
          <Row gutter className="md:h-full">
            {labs.length?getLabs():null}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Lab;
