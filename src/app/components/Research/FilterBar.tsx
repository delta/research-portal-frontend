import { useEffect, useState } from "react";
import { Select, Field, Label, Button} from 'tailwind-react-ui'
import { axiosInstance } from "../../utils/axios";
import { AorData, LabData } from '../../interfaces/home';
import "./Research.css";

const FilterBar = (props:any) => {

  const [state, setState] = useState({
    department: '',
    projectName: '',
    headName: '',
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

  const handleQuery = () => {
    let url = '/project/search?';
    for (const [key, value] of Object.entries(state)) {
      url += `${key}=${value}&`;
    }
    url = url.slice(0, -1);
    axiosInstance
      .get(url)
      .then((res: any) => {
        props.setResearches(res.data.data);
      })
      .catch((err: Error) => console.log(err));
  };

  useEffect(() => {
    handleQuery();
  }, [state]);


  return (
    <div className="p-6 shadow-2xl  w-full lg:absolute h-full lg:w-1/4 border-black">
      
      <div className="text-3xl border-b-2 border-black pb-2 mb-8"> Filter Projects </div>
      
      <div className="searchHolder relative flex items-center mb-3 mt-3 w-full">
        <input
          type="text"
          className="searchInput h-10 w-full border-2 border-black pr-8 pl-5 rounded z-0 focus:shadow focus:border-red-800"
          name="projectName"
          placeholder="Search by project Name"
          onChange={handleChange}
        />
      </div>
      
      <div className="searchHolder relative flex items-center mb-3 mt-3 w-full">
        <input
          type="text"
          className="searchInput h-10 w-full border-2 border-black pr-8 pl-5 rounded z-0 focus:shadow focus:border-red-800"
          placeholder="Search by AOR"
          name="aor"
          onChange={handleChange}
        />
      </div>

      <div className="searchHolder relative flex items-center mb-3 mt-3 w-full">
        <input
          type="text"
          className="searchInput h-10 w-full border-2 border-black pr-8 pl-5 rounded z-0 focus:shadow focus:border-red-800"
          placeholder="Search by Professor"
          name="headName"
          onChange={handleChange}
        />
      </div>

      <div className="searchHolder relative flex items-center mb-3 mt-3 w-full">
        <input
          type="text"
          className="searchInput h-10 w-full border-2 border-black pr-8 pl-5 rounded z-0 focus:shadow focus:border-red-800"
          placeholder="Search by Tags"
          name="tag"
          onChange={handleChange}
        />
      </div>
      
      <div className="filter-input-container">
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

      <div className="filter-input-container">
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
      
      <div className="filter-input-container">
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

export default FilterBar;
