import React, { ComponentState, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import {
  Label,
  Button,
  Text,
  Container,
  TextInput,
  HelpText,
  Select,
} from "tailwind-react-ui";
import { axiosInstance } from "../../utils/axios";
import CustomFilter from "./CustomFilter";
import CustomTagInput from "./CustomTagInput";
import "./CreateProject.css";

interface DepartmentData {
  id: number;
  full_name: string;
  short_name: number;
  image_url: string;
}

interface LabData {
  id: number;
  name: string;
  department: number;
  image_url: string;
  description: string;
}

interface AorData {
  id: number;
  name: string;
  description: string;
}

const CreateProject = () => {
  let state={
    name:'',
    head:'',
    paperLink:'',
    abstract:'',
    department:''
  }
  const [currentState, setCurrentState] = useState<any>(state)
  const [departments, setDepartments] = useState<Array<DepartmentData>>();
  
  const [aors, setAors] = useState<Array<AorData>>();
  const [labs, setLabs] = useState<Array<LabData>>();
  const [coes, setCoes] = useState([{name:""}]);
  const [customTags, setCustomTags] = useState<Array<string>>([]);

  const [selectedLabs, setSelectedLabs] = useState([]);
  const [selectedCoes, setSelectedCoes] = useState([]);
  const [selectedAors, setSelectedAors] = useState([]);

  const [isDepartmentsLoaded, setIsDepartmentsLoaded] = useState(false);
  const [isAorsLoaded, setIsAorsLoaded] = useState(false);
  const [isLabsLoaded, setIsLabsLoaded] = useState(false);
  const [isCoesLoaded, setIsCoesLoaded] = useState(false);

  const history = useHistory();

  function handleChange(e: any) {
    let val = e.target.name;

    if(val==='name'){
      setCurrentState({...currentState, name: e.target.value});
      console.log(currentState);
    }
    else if(val==='head'){
      currentState.head=e.target.value;
    }
    else if(val==='department'){
      currentState.department=e.target.value;
    }
    else if(val==='paperLink'){
      setCurrentState({...currentState, paperLink: e.target.value});
      console.log(currentState);
    }
    else if(val==='abstract'){
      setCurrentState({...currentState, abstract: e.target.value});
    }
    else if(val==='id'){
      setCurrentState({...currentState, id: e.target.value});
    }
  }

  const getDepartments = ()=>{
    let url = `/department`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setDepartments(res.data.data);
        setIsDepartmentsLoaded(true);
      })
      .catch((err: Error) => console.log(err));
  }

  const getLabs = () => {
    let url = `/center`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        console.log(res.data.data);
        setLabs(res.data.data);
        setIsLabsLoaded(true);
        console.log(labs);
      })
      .catch((err: Error) => console.log(err));
  }

  const getAors = () => {
    let url = `/aor`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        console.log(res.data.data);
        setAors(res.data.data);
        setIsAorsLoaded(true);
        console.log(aors);
      })
      .catch((err: Error) => console.log(err));
  }

  const getCoes = () => {
    let url = `/coe`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setCoes(res.data.data);
        setIsCoesLoaded(true);
        console.log(coes);
      })
      .catch((err: Error) => console.log(err));
  }

  useEffect(() => {
    getDepartments();
    getLabs();
    getCoes();
    getAors();
  }, []);

  function handleSubmit(e: any) {
    // send the below three to the backend
    axiosInstance({
      method: "POST",
      url: "/project/create",
      data: {...currentState, aor: selectedAors, labs: selectedLabs, coes: selectedCoes, tags: customTags},
    })
      .then((res: any) => {
        console.log(res);
        // history.push('/research')
      })
      .catch((err: any) => {
        //console.log(err);[]
      });
  }
  return (
    <div className="wrapper p-20" style={{ height: "fit-content" }}>
      <Container padding className="formContainer">
        <div className="header">
          <Text className="text-red-800 text-header">Create Project</Text>
        </div>
        <div className="fieldInput">
          <Label>Project Name</Label>
          <TextInput
            className="inputField"
            name="name"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="fieldInput">
          <Label>Head</Label>
          <TextInput
            placeholder="Your webmail ID"
            className="inputField"
            name="head"
            type="text"
            onChange={handleChange}
          />
        </div>
        {
          isAorsLoaded == true?(
            <CustomFilter options={aors} 
              selectedOptions={selectedAors}
              name="Select Areas of Research"
              setSelectedOptions={setSelectedAors} />
          ):null
        }
        <div className="fieldInput">
          <Label>Abstract</Label>
          <HelpText>Abstract of the project (max 10,000 words)</HelpText>
          <textarea
            className="inputField"
            name="abstract"
            style={{ borderRadius: "5px" }}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="fieldInput">
          <Label>Department</Label>
          <Select
            className="border-2 border-black focus:shadow focus:border-red-800"
            name="department"
            options={departments?.map((item: any, key) => {
              return {
                value: item.short_name,
                label: item.full_name,
              };
            })}
            onChange={handleChange}
          />
        </div>

        {
          isLabsLoaded == true?(
            <CustomFilter options={labs} 
              selectedOptions={selectedLabs}
              name="Select Labs"
              setSelectedOptions={setSelectedLabs} />
          ):null
        }
        {
          isCoesLoaded == true?(
            <CustomFilter options={coes}
              selectedOptions={selectedCoes}
              name="Select Ceners of Excellence"
              setSelectedOptions={setSelectedCoes}/>
          ):null
        }

        <CustomTagInput tags={customTags} setTags={setCustomTags}/>

        <div className="fieldInput">
          <Label>Paper Link</Label>
          <TextInput
            className="inputField"
            name="paperLink"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="items-center loginBtnContainer">
          <Button
            className="bg-red-800 text-white loginBtn float-right"
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default CreateProject;
