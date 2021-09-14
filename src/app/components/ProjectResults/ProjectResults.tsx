import { useState, useEffect } from "react";
import "./ProjectResults.css";
import ResearchCard from "../Research/ResearchCard";
import { useLocation } from "react-router";

const ProjectResults = () => {

  const [researches, setResearches] = useState([{}]);
  const location = useLocation();

  useEffect(() => {
    let temp: any;
    temp = location.state;
    setResearches(temp.data.data);
  }, []);

  const showResearches = () => {
    return researches.map((item, key) => {
      return <ResearchCard data={item} key={key} />;
    });
  };

  return (
    <div className="wrapper">
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
