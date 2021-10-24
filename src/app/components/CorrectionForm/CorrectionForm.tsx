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
import CustomFilter from "../CreateProject/CustomFilter";
import CustomTagInput from "../CreateProject/CustomTagInput";
import { AorData, LabData } from "../../interfaces/home";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router";


const CorrectionForm = () => {
    const history = useHistory();
    const {id} = useParams<{id: string}>();
    const [user,setUser] = useState("Write")
    let state={
      name:'',
      head:'',
      paperLink:'',
      abstract:'',
      department:''
    }
    const [currentState, setCurrentState] = useState<any>(state)

    const [aors, setAors] = useState<Array<AorData>>();
    const [labs, setLabs] = useState<Array<LabData>>();
    const [coes, setCoes] = useState([{name:""}]);
    const [customTags, setCustomTags] = useState<Array<string>>([]);

    const [selectedLabs, setSelectedLabs] = useState([]);
    const [selectedCoes, setSelectedCoes] = useState([]);
    const [selectedAors, setSelectedAors] = useState([]);

    const [isAorsLoaded, setIsAorsLoaded] = useState(false);
    const [isLabsLoaded, setIsLabsLoaded] = useState(false);
    const [isCoesLoaded, setIsCoesLoaded] = useState(false);

    function handleChange(e:any) {
      setCurrentState({...currentState,[e.target.name]:e.target.value})
    }

    function getPrivilege(){
      axiosInstance({
        method:'GET',
        url: `/project/privilege?projectId=${id}`, 
      }).then((response:any)=>{
        setUser(response.data.data)
      });
    }

    const getProject = () => {
      let url = `/project/id?projectId=${id}`;
      axiosInstance({
        method:'GET',
        url: url, 
      }).then((response:any)=>{
        let proj = response.data.data;
        setSelectedAors(proj.aor_tags.map((aor:any)=>{
          return aor.name;
        }));
        setSelectedLabs(proj.labs_tags.map((lab:any)=>{
          return lab.name;
        }));
        setSelectedCoes(proj.coe_tags.map((coe:any)=>{
          return coe.name;
        }));
        setCustomTags(proj.tags);
        setCurrentState({
          name: proj.name,
          abstract: proj.abstract,
          paperLink: proj.paper_link,
          aor: proj.aor,
          projectId: proj.id,
          head: proj.head.email
        });
      });
    }

    const getLabs = () => {
      let url = `/center`;
      axiosInstance
        .get(url)
        .then((res: any) => {
          setLabs(res.data.data);
          setIsLabsLoaded(true);
        })
        .catch((err: Error) => console.log(err));
    }

    const getAors = () => {
      let url = `/aor`;
      axiosInstance
        .get(url)
        .then((res: any) => {
          setAors(res.data.data);
          setIsAorsLoaded(true);
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
        })
        .catch((err: Error) => console.log(err));
    }

    useEffect(() => {
      getPrivilege();
      getProject();
      getLabs();
      getCoes();
      getAors();
    }, []);


    function handleSubmit(e:any){
      let route = "edit";
      if(user === "Write") route = "write";
      axiosInstance({
        method:'POST',
        url:`/project/${route}?projectId=${id}`,
        data: {...currentState, aor: selectedAors, labs: selectedLabs, coes: selectedCoes, tags: customTags},
        
      }).then((res:any)=>{
        if(res.data.status_code === 200){
          toast.success("Project edited successfully!!");
          history.push("/research");
        }
        else{
          toast.error(res.data.data);
        }
      }).catch((err:any)=>{
        console.log(err);
      })
    }
  
  return (
    <div className="wrapper p-20 pt-4" style={{ height: "fit-content" }}>
        <div className="w-full text-center">
        <Link to="/research" className="">
          <Button className="w-64 mt-4 bg-red-800 hover:bg-red-600 transform hover:scale-105 transition duration-300 text-white">
            Go Back
          </Button>
        </Link>
      </div>
      <Container padding className="formContainer">
      <div className="header">
      <Text className="text-red-800 text-header">Edit Project</Text></div>
        
        <div className="fieldInput">
          <Label>Project Name</Label>
          <TextInput className="inputField" name="name" type="text" value={currentState.name} onChange={handleChange} disabled={user!=="Admin"}/>
        </div>

        <div className="fieldInput my-2">
          <Label>Abstract</Label>
          <HelpText>Abstract of the project (max 10,000 words)</HelpText>
           <textarea className="inputField" style={{borderRadius: '5px'}} name="abstract" value={currentState.abstract} onChange={handleChange} disabled={user === "View"}></textarea>
        </div>

        {
          (isAorsLoaded == true && (user == 'Admin' || user == 'Edit'))?(
            <CustomFilter options={aors} 
              selectedOptions={selectedAors}
              name="Select Areas of Research"
              setSelectedOptions={setSelectedAors} />
          ):null
        }

        {
          (isLabsLoaded == true && (user == 'Admin' || user == 'Edit'))?(
            <CustomFilter options={labs} 
              selectedOptions={selectedLabs}
              name="Select Labs"
              setSelectedOptions={setSelectedLabs} />
          ):null
        }

        {
          (isCoesLoaded == true && (user == 'Admin' || user == 'Edit'))?(
            <CustomFilter options={coes}
              selectedOptions={selectedCoes}
              name="Select Ceners of Excellence"
              setSelectedOptions={setSelectedCoes}/>
          ):null
        }

        {
          (user == 'Admin' || user == 'Edit')?(
            <CustomTagInput tags={customTags} setTags={setCustomTags}/>
          ):null
        }

        <div className="fieldInput">
          <Label>Paper Link</Label>
          <TextInput
            className="inputField"
            name="paperLink"
            type="text"
            value={currentState.paperLink}
            onChange={handleChange}
            disabled={user === "View"}
          />
        </div>

        <div className="items-center loginBtnContainer">
          <Button className="bg-red-800 text-white loginBtn float-right" onClick={handleSubmit}>SUBMIT</Button>
        </div>
      </Container>
    </div>
  );
};

export default CorrectionForm;
