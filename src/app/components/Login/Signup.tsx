import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  Container,
  TextInput,
  HelpText,
} from "tailwind-react-ui";
import { axiosInstance } from "../../utils/axios";
import "./Login.css";

const Signup = () => {
  const [fileSelected, setFileSelected] = React.useState<File>();
  const [state, setState] = React.useState<any>({
    email: "",
    password: "",
    name: "",
  })
  function handleChange(e: any) {
    let val = e.target.name;
    if (val === "webmail") {
      state.email = e.target.value;
    } else if (val === "name") {
      state.name = e.target.value;
    }
     else if(val==="profile_pic"){
      setFileSelected(e.target.files[0]);
     }
    else state.password = e.target.value;
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    let form_data = new FormData();
    if (fileSelected) {
      form_data.append("profile_pic", fileSelected, fileSelected.name);
      form_data.append("name", state.name);
      form_data.append("email", state.email);
      form_data.append("password", state.password);
      let url = `/user/register/`;
      axiosInstance
        .post(url, form_data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res: any) => {
          console.log(res.data);
        })
        .catch((err: Error) => console.log(err));
    }
  }
  return (
    <div className="wrapper h-full">
      <Container padding className="signupContainer">
        <div className="header">
          <Text className="text-red-800 text-header">SIGN UP</Text>
        </div>
        <Field hasHelp>
          <Label>Webmail</Label>
          <HelpText>Your webmail id(Eg: 123@nitt.edu)</HelpText>
          <TextInput className="inputField" name="webmail" type="email" onChange={handleChange}/>
        </Field>
        <Field hasHelp>
          <Label>Password</Label>
          <HelpText>
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </HelpText>
          <TextInput className="inputField" name="password" type="password" onChange={handleChange} />
        </Field>
        <Field>
          <Label>Name</Label>
          <TextInput className="inputField" name="name" type="text" onChange={handleChange} />
        </Field>
        <Field>
          <Label>Profile Image</Label>
          <input type="file" id="file" name="profile_pic" onChange={handleChange} />
          <label htmlFor="file" className="fileUpload">
            <span>select</span>
          </label>
        </Field>
        <div className="items-center loginBtnContainer">
          <div className="text-red-800 infoText">
            Already have an account? <Link to="/login" >Login!</Link>
          </div>
          <Button
            onClick={handleSubmit}
            className="bg-red-800 text-white loginBtn float-right"
          >
            Register
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
