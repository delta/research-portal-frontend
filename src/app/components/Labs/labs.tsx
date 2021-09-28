import { useState, useEffect } from "react";
import { axiosInstance } from "../../utils/axios";
import "./labs.css";
import { useHistory } from "react-router";
import {
  Labs,
} from "../../interfaces/projects";
import NoResults from '../NoResults/NoResults' ;
import Professor from '../Professors/Professors';

const Lab = () => {
  const history = useHistory();

  const handleClick = (name: String) => {
    history.push(`/results/lab/${name}`)
  };
  
  const [labs, setLabs] = useState<Array<Labs>>([]);

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

      var description,contact,faculties;
      var contactIndex=lab.description.search("Contact Details:")
      var facultiesIndex=lab.description.search("Faculties:")
      description=lab.description.slice(0,contactIndex)
      contact=lab.description.slice(contactIndex,facultiesIndex)
      faculties=lab.description.slice(facultiesIndex)
      
      htmlArr.push(
        <button
          onClick={() => {
            handleClick(lab.name);
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
                src={`${lab.image_url}`}
                alt="Image"
              />
              <div className="px-6 py-4 ">
                <h5 className="text-gray-700 font-bold text-xl text-center mb-2">
                  {lab.name}
                </h5>
                <div className="max-h-sm mx:m-auto bg-gray-50">
                  <p className="text-gray-600 text-base text-justify truncate">
                    {description}
                  </p>
                </div>
                <div className="max-h-sm mx:m-auto bg-gray-50">
                  <p className="text-gray-600 text-base text-justify truncate">
                    {contact}
                  </p>
                </div>
                <div className="max-h-sm mx:m-auto bg-gray-50">
                  <p className="text-gray-600 text-base text-justify truncate">
                    {faculties}
                  </p>
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
        {labs.length ? labCards() : noResult()}
      </div>
    </div>
  );
};

export default Lab;
