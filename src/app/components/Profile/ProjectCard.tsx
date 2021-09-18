import "./Profile.css";
import { useHistory } from "react-router-dom";

const ProjectCard = (props: any) => {
    let project:any;  
    if(props.data.hasOwnProperty("data"))
        project =  props.data.data;
    else
        project = props.data;  
    let aorTags = project.aor_tags;
    let customTags = project.tags;

    const history = useHistory();

    const showTags = (tags: any, color: string) => {
      console.log(tags);
      let htmlArr = tags.map((item:any, key:any) => {
        item = (item.name!==undefined)?item.name:item;
        return (
          <span
            key={key}
            className="text-xs inline-block font-semibold  py-1 px-2 rounded-full bg-red-800 text-white uppercase last:mr-0 mr-1"
            style={{
              backgroundColor: color,
            }}
          >
            {item}
          </span>
        );
      })
      return htmlArr
    }

    return (
      <div className="sm:w-5/12 w-11/12 mx-auto flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden p-4 my-3">
        
        {/* Title and Tags Div */}
        <div className="w-full">
          <div className="uppercase tracking-wide xl:text-2xl text-xl text-red-800 font-bold">
            {project.name}
          </div>
          <div className="">
            {showTags(customTags, "red")}
            {showTags(aorTags, "blue")}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col lg:mt-0 mt-4 xl:flex-row">
          {/* Img Div */}
          <div className="flex w-full items-center">
            <img
              className="w-full object-cover"
              src={project.head.image_url}
              alt="Head of the project"
            />
          </div>
          {/* Right side div */}
          <div className="p-8 pt-0 flex flex-col w-full truncate whitespace-pre-line">
            <p className="mt-2 text-black">
              {project.abstract}
            </p>
          </div>
        </div>
        
        {/* Button */}
        <button
          className="bg-red-800 hover:bg-red-700 text-white mt-4 font-bold py-2 px-4 w-full self-end"
          onClick={() => history.push(`/project/${project.id}`)}
        >
          View Project
        </button>
        
      </div>
    );
};

export default ProjectCard;
