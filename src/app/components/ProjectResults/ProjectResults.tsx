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
  contact: string;
  faculties: string;
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
          let contactIndex = details.description.search("Contact Details:");
          let facultiesIndex = details.description.search("Faculties:");
          if (facultiesIndex == 0 || contactIndex == 0)
            detailsObj.description = null;
          else if (facultiesIndex != -1 || contactIndex != -1) {
            if (contactIndex < facultiesIndex && contactIndex != -1)
              detailsObj.description = details.description.slice(
                0,
                contactIndex
              );
            else
              detailsObj.description = details.description.slice(
                0,
                facultiesIndex
              );
          }
          if (facultiesIndex === -1 && contactIndex === -1)
            detailsObj.description = details.description;

          if (contactIndex !== -1 && facultiesIndex !== -1) {
            let contact = details.description.slice(
              contactIndex + 16,
              facultiesIndex
            );
            let faculties = details.description.slice(facultiesIndex + 10);
            detailsObj.faculties = faculties;
            detailsObj.contact = contact;
          } else if (facultiesIndex !== -1) {
            let faculties = details.description.slice(facultiesIndex + 10);
            detailsObj.faculties = faculties;
            detailsObj.contact = " No records found";
          } else if (contactIndex !== -1) {
            let contact = details.description.slice(
              contactIndex + 16,
              facultiesIndex
            );
            detailsObj.contact = contact;
            detailsObj.faculties = " No records found";
          } else {
            detailsObj.contact = " No records found";
            detailsObj.faculties = " No records found";
          }
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
    <div className="wrapper p-4">
      <div className="flex-1 w-full">
        {cardDetail?.image_url === "" ? (
          <div className="w-full flex flex-col">
            <div className="flex flex-wrap w-full rounded-lg shadow-xl">
              <div className="w-full flex flex-col p-4">
                <div
                  className="text-xl flex justify-between my-2 w-full"
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
            </div>
          </div>
        ) : (
          <>
            {cardDetail?.description === "" ? (
              <></>
            ) : (
              <>
                <div className="w-full flex flex-col rounded-lg shadow-xl">
                  <div className="flex flex-wrap w-full">
                    <div className="w-full md:w-1/2 xl:w-1/4 border-r-2 border-black">
                      <div
                        className="card-head p-2 text-white bg-red-800"
                        style={{
                          fontFamily: "Lato",
                          fontWeight: 400,
                        }}
                      >
                        <span className="text-3xl">{cardDetail?.name}</span>
                      </div>
                      <div className="card-image h-full">
                        {cardDetail?.image_url !== "" ? (
                          <img
                            src={cardDetail?.image_url}
                            className="w-full h-full object-fill"
                            alt="image"
                          ></img>
                        ) : null}
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 xl:w-3/4 flex flex-col p-4">
                      <div
                        className="text-xl flex justify-between my-2 w-full"
                        style={{
                          fontFamily: "Lato",
                          fontSize: "1.5rem",
                          lineHeight: "1.75rem",
                          fontWeight: 400,
                          wordSpacing: "0.5rem",
                        }}
                      >
                        {cardDetail?.description}
                        <br />
                      </div>

                      <div
                        style={{
                          fontFamily: "Lato",
                          fontSize: "1.5rem",
                          lineHeight: "1.75rem",
                          fontWeight: 300,
                          wordSpacing: "0.5rem",
                        }}
                      >
                        <span style={{ fontWeight: 400, color: "red" }}>
                          Contact Details:
                        </span>
                        {cardDetail?.contact}
                        <br />
                        <span style={{ fontWeight: 400, color: "red" }}>
                          Faculties:
                        </span>
                        {cardDetail?.faculties}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        <div className="w-full md:flex md:flex-1">
          {cardDetail?.description === "" ? (
            <div className="w-full md:w-1/2 xl:w-1/3 border-r-2 border-black">
              <div
                className="card-head p-2 text-white bg-red-800"
                style={{
                  fontFamily: "Lato",
                  fontWeight: 400,
                }}
              >
                <span className="text-3xl">{cardDetail?.name}</span>
              </div>
              <div className="card-image h-full">
                {cardDetail?.image_url !== "" ? (
                  <img
                    src={cardDetail?.image_url}
                    className="w-full h-full object-fill"
                    alt="image"
                  ></img>
                ) : null}
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="w-full">
            <h1 className="header-results">
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
    </div>
  );
};

export default ProjectResults;
