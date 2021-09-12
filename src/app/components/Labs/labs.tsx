import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../utils/axios";
import "./labs.css";
import { useHistory } from "react-router";

const Lab = () => {
  const history = useHistory();
  const handleClick = (name: String) => {
    let url = `/project/search?department=&projectName=&headName=&aor=&lab=${name}&coe=&tag=`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        console.log(res);
        history.push("/results", { data: res.data });
      })
      .catch((err: Error) => console.log(err));
  };
  let img =
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";

  const [labs, setLabs] = useState([
    { name: "", description: "", image_url: "" },
  ]);

  useEffect(() => {
    let url = `/center`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setLabs(res.data.data);
      })
      .catch((err: Error) => console.log(err));
  }, []);

  const labCards = () => {
    let htmlArr: JSX.Element[] = [];
    labs.forEach((lab, index) => {
      htmlArr.push(
        <button
          onClick={() => {
            handleClick(lab.name);
          }}
        >
          <div
            className="m-4 p-4"
            style={{
              height: "40rem",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <img
              src={`${lab.image_url}`}
              alt="Example image"
              className="h-96"
            ></img>
            <div className="flex flex-col text-left">
              <div className="overflow-y-scroll h-52 p-4 pb-10">
                <h1 className="text-3xl font-bold mb-4">{lab.name}</h1>
                <p>{lab.description}</p>
              </div>
            </div>
          </div>
        </button>
      );
    });
    return htmlArr;
  };

  return (
    <div className="wrapper mt-10 mb-10 p-2">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-center justify-items-center gap-4 m-2">
        {labs.length ? labCards() : null}
      </div>
    </div>
  );
};

export default Lab;
