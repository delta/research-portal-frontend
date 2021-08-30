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
import "./CreateProject.css";

const CreateProject = () => {
  let state={
    name:'',
    head:'',
    paperLink:'',
    aor:'',
    abstract:'',
    department:''
  }
  const [currentState, setCurrentState] = useState<any>(state)
  const [options, setOptions] = useState<Array<Object>>();
  const [departments, setDepartments] = useState([
    {
      full_name: "",
      short_name: "",
    },
  ]);

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
    else if(val==='aor'){
      setCurrentState({...currentState, aor: e.target.value});
    }
    else if(val==='abstract'){
      setCurrentState({...currentState, abstract: e.target.value});
    }
    else if(val==='id'){
      setCurrentState({...currentState, id: e.target.value});
    }
  }

  async function getDepartments() {
    let url = `/department`;
    await axiosInstance
      .get(url)
      .then(async (res: any) => {
        setDepartments(res.data.data);
        let ob: Array<Object> = [];
        await departments.forEach((item) => {
          ob.push({
            value: item.short_name,
            label: item.full_name,
          });
        });
        await setOptions(ob);
      })
      .catch((err: Error) => console.log(err));
  }
  useEffect(() => {
    getDepartments();
  }, [options]);

  function handleSubmit(e: any) {
    console.log(currentState)
    axiosInstance({
      method: "POST",
      url: "/project/create",
      data: currentState,
    })
      .then((res: any) => {
        console.log(res);
        history.push('/research')
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
        <div className="fieldInput">
          <Label>Area Of Research</Label>
          <Select
            onChange={handleChange}
            className="border-2 border-black focus:shadow focus:border-red-800"
            name="aor"
            options={[
              { value: "Machine Learning", label: "Machine Learning" },
              { value: "Robotics", label: "Robotics" },
              { value: "Blockchain", label: "Blockchain" },
            ]}
          />
        </div>
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
            options={options}
            onChange={handleChange}
          />
        </div>
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
