import { useState, useEffect } from "react";
import "./ProjectResults.css";
import ResearchCard from "../Research/ResearchCard";
import { useParams } from "react-router";
import { axiosInstance } from "../../utils/axios";
import {
  Project,
} from "../../interfaces/projects";

const ProjectResults = () => {

  const [researches, setResearches] = useState<Array<Project>>([]);
  const { filterBy } = useParams<{ filterBy: string }>();
  const { value } = useParams<{ value: string }>();

  const getData=()=>{
    if(filterBy==='department'){
      let url = `/project/search?department=${value}&projectName=&headName=&aor=&lab=&coe=&tag=`;
      axiosInstance
        .get(url)
        .then((res: any) => {
          setResearches(res.data.data);
        })
        .catch((err: Error) => console.log(err));
    }
    else if(filterBy==='aor'){
      let url = `/project/search?department=&projectName=&headName=&aor=${value}&lab=&coe=&tag=`;
      axiosInstance
        .get(url)
        .then((res: any) => {
          setResearches(res.data.data);
        })
        .catch((err: Error) => console.log(err));
    }
    else if(filterBy==='coe'){
      let url = `/project/search?department=&projectName=&headName=&aor=&lab=&coe=${value}&tag=`;
      axiosInstance
        .get(url)
        .then((res: any) => {
          setResearches(res.data.data);
        })
        .catch((err: Error) => console.log(err));
    }
    else if(filterBy==='headName'){
      let url = `/project/search?department=&projectName=&headName=${value}&aor=&lab=&coe=&tag=`;
      axiosInstance
        .get(url)
        .then((res: any) => {
          setResearches(res.data.data);
        })
        .catch((err: Error) => console.log(err));
    }
    else if(filterBy==='lab'){
      let url = `/project/search?department=&projectName=&headName=&aor=&lab=${value}&coe=&tag=`;
      axiosInstance
        .get(url)
        .then((res: any) => {
          setResearches(res.data.data);
        })
        .catch((err: Error) => console.log(err));
    }
    else{
      let url = `/project/search?department=&projectName=&headName=&aor=&lab=&coe=&tag=${value}`;
      axiosInstance
        .get(url)
        .then((res: any) => {
          setResearches(res.data.data);
        })
        .catch((err: Error) => console.log(err));
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const showResearches = () => {
    return researches.map((item, key) => {
      return <ResearchCard data={item} key={key} />;
    });
  };

  return (
    <div className="wrapper">
      <h1 className="header-results">{researches.length? researches.length: "No"} results found for {value}</h1>
      <div className="main-container mb-10">
        <div className="results container-1 m-3 flex flex-auto justify-center">  
          <div className="flex flex-wrap m-10">  
            {researches.length ? showResearches() : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectResults;
