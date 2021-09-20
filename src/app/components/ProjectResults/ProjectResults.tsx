import { useState, useEffect } from "react";
import "./ProjectResults.css";
import ResearchCard from "../Research/ResearchCard";
import { useParams } from "react-router";
import { axiosInstance } from "../../utils/axios";
import { Project } from "../../interfaces/projects";

interface CardDetail {
  image_url: string;
  name: string;
  description: string;
}

const ProjectResults = () => {
  const [researches, setResearches] = useState<Array<Project>>([]);
  const { filterBy } = useParams<{ filterBy: string }>();
  const { value } = useParams<{ value: string }>();
  const [cardDetail, setCardDetail] = useState<CardDetail>();

  const getData = () => {
    let obj: any = {
      department: "",
      projectName: "",
      headName: "",
      aor: "",
      lab: "",
      coe: "",
      tag: "",
    };
    obj[filterBy] = value;
    let query = "";
    for (let prop in obj) query += `${prop}=${obj[prop]}&`;
    query = query.slice(0, -1);
    let url = `/project/search?${query}`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setResearches(res.data.data);
      })
      .catch((err: Error) => console.log(err));
  };

  const getCardDetails = () => {
    let obj: any = {
      department: "/department",
      aor: "/aor",
      coe: "/coe",
      lab: "/center",
    };
    let url = obj[filterBy];
    axiosInstance
      .get(url)
      .then((res: any) => {
        let details = res.data.data.filter((item: any) => {
          let name = filterBy === "department" ? item.short_name : item.name;
          return name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        })[0];
        //console.log(details);
        let detailsObj: any = {};
        if (filterBy === "department") {
          detailsObj.name = details.full_name;
          detailsObj.description = "";
        } else {
          detailsObj.name = details.name;
          detailsObj.description = details.description;
        }
        if (filterBy === "aor") {
          detailsObj.image_url = "";
        } else {
          detailsObj.image_url = details.image_url;
        }
        setCardDetail(detailsObj);
      })
      .catch((err: Error) => console.log(err));
  };

  useEffect(() => {
    getData();
    getCardDetails();
  }, []);

  const showResearches = () => {
    return researches.map((item, key) => {
      return <ResearchCard data={item} key={key} />;
    });
  };

  return (
    <div className="wrapper h-full p-4 mb-5 overflow-y-scroll" style={{ minHeight: "100%;", height:"fit-content"}}>
      <div className="grid md:grid-flow-col grid-auto gap-1 h-full" style={{ minHeight:"100vh"}}>
        <div className="w-full flex flex-auto h-full">
          <div className="flex flex-wrap w-full h-full">
            {filterBy !== "department" ? (
              <div className="w-full md:w-1/2 xl:w-1/2">
                <div
                  className="card-head p-2 text-white bg-red-800"
                  style={{
                    fontFamily: "Lato",
                    fontWeight: 400,
                  }}
                >
                  <span className="text-3xl">{cardDetail?.name}</span>
                </div>
                <div className="card-image">
                  {cardDetail?.image_url !== "" ? (
                    <img
                      src={cardDetail?.image_url}
                      className="w-full"
                      alt="image"
                    ></img>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="w-full col-span-2 md:col-span-1 max-w-md">
                <div
                  className="card-head p-2 text-white bg-red-800"
                  style={{
                    fontFamily: "Lato",
                    fontWeight: 400,
                  }}
                >
                  <span className="text-3xl">{cardDetail?.name}</span>
                </div>
                <div className="card-image">
                  {cardDetail?.image_url !== "" ? (
                    <img
                      src={cardDetail?.image_url}
                      className="w-full"
                      alt="image"
                    ></img>
                  ) : null}
                </div>
              </div>
            )}
            {filterBy !== "department" ? (
              <div className="w-full md:w-1/2 xl:w-1/2 flex flex-col p-4 border-black relative md:right-20 md:top-60 h-auto max-h-96 bg-white shadow-xl mb-4">
                <div
                  className="text-xl flex justify-between my-2 w-full overflow-y-scroll mb-4 h-full"
                  style={{
                    fontFamily: "Lato",
                    fontSize: "1.5rem",
                    lineHeight: "1.75rem",
                    fontWeight: 300,
                    wordSpacing: "0.5rem",
                  }}
                >
                  {cardDetail?.description}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full text-center col-span-2">
          <h1 className="header-results w-full">
            {researches.length ? researches.length : "No"} results found for{" "}
            {value}
          </h1>
          {/* Project Cards */}
          <div className="main-container mb-10">
            <div className="results container-1 m-3 flex flex-auto justify-center">
              <div className="flex flex-wrap m-10">
                {researches.length ? showResearches() : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectResults;
