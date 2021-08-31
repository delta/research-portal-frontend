import React, { useEffect, useState } from "react";
import {
  Label,
  Button,
  Text,
  Container,
  TextInput,
  HelpText,
} from "tailwind-react-ui";
import { axiosInstance } from "../../utils/axios";
import './CorrectionForm.css';
import { useParams } from "react-router";

const CorrectionForm = () => {
    const {id} = useParams<{id: string}>();
    const [user,setUser] = useState("write")
    let state={
      name:'',
      head:'',
      paperLink:'',
      aor:'',
      abstract:'',
      department:''
    }
    const [currentState, setCurrentState] = useState<any>(state)
    function handleChange(e:any) {
      let val = e.target.name;
      if(val==='name'){
        setCurrentState({...currentState, name: e.target.value});
        console.log(currentState);
      }
      else if(val==='head'){
        state.head=e.target.value;
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
    function getPrivilege(){
      axiosInstance({
        method:'GET',
        url: `/project/privilege/projectId=${id}`, 
      }).then((response:any)=>{
        setUser(response.data.data)
      });
    }
    useEffect(() => {
      getPrivilege();
      let url = `/project/id?projectId=${id}`;
      axiosInstance({
        method:'GET',
        url: url, 
      }).then((response:any)=>{
        let proj = response.data.data;
        setCurrentState({
          name: proj.name,
          abstract: proj.abstract,
          paperLink: proj.paper_link,
          aor: proj.aor,
          projectId: proj.id
        });
      });
    }, []);
    function handleSubmit(e:any){
      console.log(currentState);
      axiosInstance({
        method:'POST',
        url:'/project/edit',
        data: currentState,
        params: currentState
      }).then((res:any)=>{
        window.location.href = '/research';
      }).catch((err:any)=>{
        console.log(err);
      })
    }
  
  return (
    <div className="wrapper h-full">
      <Container padding className="formContainer">
      <div className="header">
      <Text className="text-red-800 text-header">Edit Project</Text></div>
        <div className="fieldInput">
          <Label>Project Name</Label>
          {user==="admin"?<TextInput className="inputField" name="projectName" type="text" value={currentState.name} onClick={handleChange}/>:<TextInput className="inputField" name="projectName" type="text" value={currentState.name} onClick={handleChange} disabled={true}/>}
        </div>
        <div className="fieldInput">
          <Label>Heading</Label>
          {user==="admin"?<TextInput className="inputField" name="heading" type="text" value={currentState.head} onClick={handleChange}/>:<TextInput className="inputField" name="heading" type="text" value={currentState.head} onClick={handleChange} disabled={true}/>}
        </div>
        <div className="fieldInput">
          <Label>Area Of Research</Label>
          {(user==="admin" || user==="edit")?<TextInput className="inputField" name="name" value={currentState.aor} type="text" onClick={handleChange}/>:<TextInput className="inputField" name="name" type="text" value={currentState.aor} onClick={handleChange} disabled={true}/>}
        </div>
        <div className="fieldInput">
          <Label>Abstract</Label>
          <HelpText>Abstract of the project (max 10,000 words)</HelpText>
           <textarea className="inputField" style={{borderRadius: '5px'}} value={currentState.abstract} onClick={handleChange}></textarea>
        </div>
        <div className="items-center loginBtnContainer">
          <Button className="bg-red-800 text-white loginBtn float-right" onClick={handleSubmit}>SUBMIT</Button>
        </div>
      </Container>
    </div>
  );
};

export default CorrectionForm;
