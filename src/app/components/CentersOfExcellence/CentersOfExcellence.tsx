import React, { useState, useEffect } from "react";
import "./CentersOfExcellence.css";
import { CoeData } from "../../interfaces/home";
import { axiosInstance } from "../../utils/axios";
import { useHistory } from "react-router";

const Center = () => {
  const [centers, setCenters] = useState<Array<CoeData>>();
  const [isCoesLoaded, setIsCoesLoaded] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let url = `/coe`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setCenters(res.data.data);
        setIsCoesLoaded(true);
      })
      .catch((err: Error) => console.log(err));
  }, []);

  const getCenters = () => {
    const handleClick = (name: String) => {
      history.push(`/results/coe/${name}`);
    };
    let htmlArr: JSX.Element[] = [];
    if (centers !== undefined) {
      centers.forEach((center) => {
        htmlArr.push(
          <button
            onClick={() => {
              handleClick(center.name);
            }}
          >
            <div
              className=" border border-gray-100 px-5 py-3 mt-6 mb-6 ml-3 mr-3 rounded-md shadow-lg max-w-sm justify-items-center shadow-2xl"
              style={{
                height: "fit-content",
              }}
            >
              <img
                className="w-full w-lg center-img rounded-sm h-96"
                src={`${center.image_url}`}
                alt="Image"
              />
              <div className="px-6 py-4 md:h-48">
                <h5 className="text-gray-700 font-bold text-xl text-center mb-2">
                  {center.name}
                </h5>
                <div className="max-h-sm mx:m-auto bg-gray-50">
                  <p className="text-gray-600 text-base text-justify truncate">
                    {center.description}
                  </p>
                </div>
              </div>
            </div>
          </button>
        );
      });
    }
    return htmlArr;
  };

  return (
    <div className="container">
      <h1 className="font-bold text-5xl text-gray-700 text-center mt-2 mb-2 tracking-widest">
        Centers of Excellence
      </h1>
      <div className="container md:mx-auto md:px-20 md:py-5 m-auto grid grid-flow-row lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {isCoesLoaded ? getCenters() : null}
      </div>
    </div>
  );
};

export default Center;
