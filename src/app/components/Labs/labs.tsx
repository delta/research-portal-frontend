import { useState, useEffect } from "react";
import { axiosInstance } from "../../utils/axios";
import "./labs.css";
import { useHistory } from "react-router";
import { Labs } from "../../interfaces/projects";
import Pagination from "../Pagination/Pagination";

const Lab = () => {
  const history = useHistory();

  const handleClick = (name: String) => {
    history.push(`/results/lab/${name}`);
  };

  const [labs, setLabs] = useState<Array<Labs>>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  useEffect(() => {
    setLoading(true);
    let url = `/center`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setLabs(res.data.data);
      })
      .catch((err: Error) => console.log(err));
    setLoading(false);
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = labs.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  const labCards = (currentPosts: any) => {
    let htmlArr: JSX.Element[] = [];
    for (var j = indexOfFirstPost; j < indexOfLastPost; j++) {
      htmlArr.push(
        <button
          onClick={() => {
            handleClick(labs[j].name);
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
              src={`${labs[j].image_url}`}
              alt="Image"
            />
            <div className="px-6 py-4 ">
              <h5 className="text-gray-700 font-bold text-xl text-center mb-2">
                {labs[j].name}
              </h5>
              <div className="max-h-sm mx:m-auto bg-gray-50">
                <p className="text-gray-600 text-base text-justify truncate">
                  {labs[j].description}
                </p>
              </div>
            </div>
          </div>
        </button>
      );
    }
    labs.forEach((lab, index) => {});
    return htmlArr;
  };

  return (
    <div className="wrapper mt-10 mb-10 p-2">
      <div className="sticky top-0 flex justify-center  ">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={labs.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-center justify-items-center gap-4 m-2">
        {labs.length ? labCards(currentPosts) : null}
      </div>
      <div className="flex justify-center mb-11">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={labs.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Lab;
