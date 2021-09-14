import { useEffect, useState } from "react";
import { Select, Field, Label, Button} from 'tailwind-react-ui'
import { axiosInstance } from "../../utils/axios";
import { AorData, LabData } from '../../interfaces/home';
import "./Profile.css";

const HorizontalFilterBar = (props:any) => {

  const [state, setState] = useState({
    headName:'',
    department: '',
    projectName: '',
    aor: '',
    lab: '',
    coe: '',
    tag: '',
  });

  const [departments,setDepartments] = useState([]);  
  const [aors, setAors] = useState<Array<AorData>>();
  const [labs, setLabs] = useState<Array<LabData>>();
  const [coes, setCoes] = useState([{name:""}]);

  const [isAorsLoaded, setIsAorsLoaded] = useState(false);
  const [isLabsLoaded, setIsLabsLoaded] = useState(false);
  const [isCoesLoaded, setIsCoesLoaded] = useState(false);

  const getDepartments = () => {
    let url = `/department`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setDepartments(res.data.data);
      })
      .catch((err: Error) => console.log(err));
  }

  const getLabs = () => {
    let url = `/center`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setLabs(res.data.data);
        setIsLabsLoaded(true);
      })
      .catch((err: Error) => console.log(err));
  }

  const getAors = () => {
    let url = `/aor`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setAors(res.data.data);
        setIsAorsLoaded(true);
      })
      .catch((err: Error) => console.log(err));
  }

  const getCoes = () => {
    let url = `/coe`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setCoes(res.data.data);
        setIsCoesLoaded(true);
      })
      .catch((err: Error) => console.log(err));
  }
  
  useEffect(() => {
    getDepartments();
    getLabs();
    getCoes();
  }, []);

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const filterProjects = (projects:any) => {
    let filteredProjects = projects.filter((project: any) => {
      console.log(project);
      if(project.hasOwnProperty("access"))
        project = project.data;
      let isHeadNameMatched = project.head.name.toLowerCase().includes(state.headName.toLowerCase());
      let isProjectNameMatched = project.name.toLowerCase().includes(state.projectName.toLowerCase());
      let isDepartmentMatched = project.department.full_name.toLowerCase().includes(state.department.toLowerCase());
      let isAorMatched = state.aor === "" || project.aor_tags.some((aor: any) => {
        return aor.name.toLowerCase().includes(state.aor.toLowerCase());
      });
      let isLabMatched = state.lab === "" || project.labs_tags.some((lab: any) => {
        return lab.name.toLowerCase().includes(state.lab.toLowerCase());
      });
      let isCoeMatched = state.coe === "" || project.coe_tags.some((coe: any) => {
        return coe.name.toLowerCase().includes(state.coe.toLowerCase());
      });
      let isTagMatched = state.tag === "" || project.tags.some((tag: any) => {
        return tag.toLowerCase().includes(state.tag.toLowerCase());
      });
      return isHeadNameMatched && isProjectNameMatched && isDepartmentMatched && isAorMatched && isLabMatched && isCoeMatched && isTagMatched;
    }
    );
    return filteredProjects;
  }

  const handleQuery = () => {
    if(props.profileData === undefined) return;
    let projects = props.profileData.projects;
    let non_admin_projects = props.profileData.non_admin_projects;
    projects = filterProjects(projects);
    non_admin_projects = filterProjects(non_admin_projects);
    props.setProfileData({
      ...props.profileData,
      filteredProjects: projects,
      filteredNon_admin_projects: non_admin_projects,
    });
  };

  useEffect(() => {
    handleQuery();
  }, [state]);


  return (
    <div className="p-6 mb-4 w-full flex flex-wrap justify-around border-black">
      <div className="searchHolder relative flex items-center mb-3 mt-3 mx-2 w-full lg:w-1/4">
        <input
          type="text"
          className="searchInput h-10 w-full border-2 border-black pr-8 pl-5 rounded z-0 focus:shadow focus:border-red-800"
          name="projectName"
          placeholder="Search by project Name"
          onChange={handleChange}
        />
      </div>
      
      <div className="searchHolder relative flex items-center mb-3 mt-3 mx-2 w-full lg:w-1/4">
        <input
          type="text"
          className="searchInput h-10 w-full border-2 border-black pr-8 pl-5 rounded z-0 focus:shadow focus:border-red-800"
          placeholder="Search by AOR"
          name="aor"
          onChange={handleChange}
        />
      </div>

      <div className="searchHolder relative flex items-center mb-3 mt-3 mx-2 w-full lg:w-1/4">
        <input
          type="text"
          className="searchInput h-10 w-full border-2 border-black pr-8 pl-5 rounded z-0 focus:shadow focus:border-red-800"
          placeholder="Search by Tags"
          name="tag"
          onChange={handleChange}
        />
      </div>
      
      <div className="mt-4 filter-input-container mx-2 w-full lg:w-1/4">
        <Label className="filterLabel">Filter By department</Label>
        <Field>
          <Select
            className="filter-input border-2 w-full border-black focus:shadow focus:border-red-800"
            name="department"
            onChange={handleChange}
            options={departments.map((item: any, key) => {
              return {
                value: item.short_name,
                label: item.full_name,
              };
            })}
          />
        </Field>
      </div>

      <div className="mt-4 filter-input-container mx-2 w-full lg:w-1/4">
        <Label className="filterLabel">Filter By Labs</Label>
        <Field>
          <Select
            className="filter-input border-2 w-full border-black focus:shadow focus:border-red-800"
            name="lab"
            onChange={handleChange}
            options={labs?.map((item: LabData, key) => {
              return {
                value: item.name,
                label: item.name,
              };
            })}
          />
        </Field>
      </div>
      
      <div className="mt-4 filter-input-container mx-2 w-full lg:w-1/4">
        <Label className="filterLabel">Filter By Coe</Label>
        <Field>
          <Select
            className="filter-input border-2 w-full border-black focus:shadow focus:border-red-800"
            name="coe"
            onChange={handleChange}
            options={coes.map((item: any, key) => {
              return {
                value: item.name,
                label: item.name,
              };
            })}
          />
        </Field>
      </div>
    </div>
  );
};

export default HorizontalFilterBar;
