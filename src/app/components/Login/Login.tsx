import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import {
  Field,
  Label,
  Button,
  Text,
  Container,
  TextInput,
} from "tailwind-react-ui";
import "./Login.css";
import { axiosInstance } from "../../utils/axios";

const Login = () => {
  const history = useHistory();
  let user="Admin";
  let state={
    email:'',
    password:''
  }
  function handleChange(e:any) {
    let val = e.target.name;
    if(val==='webmail'){
      state.email=e.target.value;
    }
    else state.password=e.target.value;
  }
  function handleSubmit(){
    axiosInstance({
      method:'POST',
      url: `/user/login/`,
      data:{
        'email':state.email,
        'password':state.password
      }
    }).then((response:any)=>{
      if (response.data.status_code === 200) {
        toast.success("Logged in successfully!");
        localStorage.setItem("email", response.data.data.email);
        history.push("/profile");
      } else {
        toast.error("Error logging in, please try again!!");
      }
    });
  }
  return <div className="wrapper center h-full">
    <Container padding className="loginContainer">
      <div className="header">
      <Text className="text-red-800 text-header">LOGIN</Text></div>
        <Field>
          <Label>Webmail</Label>
          <TextInput className="inputField" name="webmail" type="email" onChange={handleChange} />
        </Field>
        <Field className = "align-content-center">
          <Label>Password</Label>
          <TextInput className="inputField" name="password" type="password" onChange={handleChange} />
        </Field>
        <div className="items-center loginBtnContainer">
        <div className="text-red-800 infoText">Don't have an account? <Link to="/signup">Register!</Link></div>
        <Button className="bg-red-800 text-white loginBtn float-right" onClick={handleSubmit}>Login</Button>
        </div>
      </Container>
  </div>;
};

export default Login;
