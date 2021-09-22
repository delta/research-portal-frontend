import { useState, useEffect } from "react";
import { axiosInstance } from "../../utils/axios";
import "./labs.css";
import { useHistory } from "react-router";
import NoResults from '../NoResults/NoResults' ;

const Lab = () => {
  const history = useHistory();
  const handleClick = (name: String) => {
    let url = `/project/search?department=&projectName=&headName=&aor=&lab=${name}&coe=&tag=`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        history.push("/results", { data: res.data });
      })
      .catch((err: Error) => console.log(err));
  };
  
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
            key={index}
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
  const noResult = ()=>{
    return (
      <NoResults flag={2}/>
    );
};

  return (
    <div className="wrapper mt-10 mb-10 p-2">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-center justify-items-center gap-4 m-2">
        {labs.length ? noResult() : noResult()}
      </div>
    </div>
  );
};

export default Lab;
