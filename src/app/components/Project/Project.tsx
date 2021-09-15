import React, { useEffect, useState } from "react";
import "./Project.css";
import { Select, Label, Button } from "tailwind-react-ui";
import { useParams } from "react-router";
import { axiosInstance } from "../../utils/axios";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const Project = () => {
  const [modalIsOpen1, setIsOpen1] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [member, setMember] = useState('');
  const [role, setRole] = useState('');

  const openModal1 = () => {
    setIsOpen1(true);
  };

  const closeModal1 = () => {
    setIsOpen1(false);
  };
  const openModal2 = () => {
    setIsOpen2(true);
  };

  const closeModal2 = () => {
    setIsOpen2(false);
  };

  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState({
    head: {
      name: "",
      id: null,
      email: "",
      image_url: "",
      is_staff: "",
    },
    department: {
      full_name: "",
      id: null,
      short_name: "",
    },
    aor: {},
    id: null,
    abstract: "",
    paper_link: "",
    members: [{ name: "", permission: "", image_url: "" }],
  });

  const [userPrivilege, setUserPrivilege] = useState("View");

  const history = useHistory()  

  const getProjectDetails = () => {
    let url = `/project/id?projectId=${id}`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setProject(res.data.data);
      })
      .catch((err: Error) => console.log(err));
  };

  const checkCurrentUserPrivilege = () => {
    let url = `/project/privilege?projectId=${id}`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setUserPrivilege(res.data.data);
      })
      .catch((err: Error) => console.log(err));
  };

  useEffect(() => {
    getProjectDetails();
    checkCurrentUserPrivilege();
}, []);

  const handleMember=(e:any)=>{
    setMember(e.target.value);
    console.log(member)
  }

  const handleRole=(e:any)=>{
    console.log(e.target.value)
    setRole(e.target.value);
    console.log(role)
  }

  const addRole=()=>{
    let url=`/admin_user/add_members/`;
    axiosInstance({
      method:'POST',
      url:url,
      data:{
        user_id:member,
        project_id:id,
        role:role
      }
    }).then((res:any)=>{
      console.log(res);
      if (res.data.status_code === 200) {
        toast.success("Member added successfully !");
        history.push(`/project/${id}`);
      } else {
        toast.error(res.data.data);
      }
      console.log(res);
    }).catch((err:Error)=>{
      console.log(err);
    })
  }

  return (
    <div className="flex flex-col items-center mt-5 mb-10 sm:mb-20 sm:mt-20 p-0 sm:p-2 m-7">
      <div>
        <Modal
          isOpen={modalIsOpen1}
          onRequestClose={closeModal1}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <form>
            <div className="fieldInput">
              <Label>Webmail</Label>
              <input className="inputField" name="heading" type="text" onChange={handleMember} />
            </div>
            <div className="fieldInput">
              <Label>Permission</Label>
              <Select
                className="inputField"
                name="selectPrivilege"
                onChange={handleRole}
                options={[
                  { label: "Edit", value: 3 },
                  { label: "Write", value: 2 },
                  { label: "View", value: 1 },
                ]}
              />
            </div>
            {userPrivilege !== "View" ? (
              <div className="flex justify-between m-4">
                <Button
                  onClick={closeModal1}
                  className="adminButton w-40 bg-red-800 text-white"
                >
                  Close
                </Button>
                <Button
                  onClick={addRole}
                  className="adminButton w-40 bg-red-800 text-white"
                >
                  Add Member
                </Button>
              </div>
            ) : (
              <div></div>
            )}
          </form>
        </Modal>
        <Modal
          isOpen={modalIsOpen2}
          onRequestClose={closeModal2}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <form>
            <div className="fieldInput">
              <Label>Add Tags</Label>
              <Select
                className="inputField"
                name="selectPrivilege"
                options={[
                  { value: "Machine Learning", label: "ML" },
                  { value: "Sensors", label: "Sensors" },
                  { value: "Transducers", label: "Transducers" },
                ]}
              />
            </div>
            <div className="flex justify-between m-0">
              <Button
                onClick={closeModal2}
                className="adminButton w-40 bg-red-800 text-white m-2"
              >
                Close
              </Button>
              <Button
                onClick={closeModal2}
                className="adminButton w-40 bg-red-800 text-white m-2"
              >
                Add Tags
              </Button>
            </div>
          </form>
        </Modal>
      </div>
      <div className="flex flex-col items-center sm:flex-row antialiased rounded-lg border shadow-lg p-3 sm:p-10 sm:w-9/12">
        <div>
          <img
            className="w-32 max-h-32 mb-4 sm:mb-0"
            src={project.head.image_url}
            alt="Project"
          ></img>
        </div>
        <div className="flex-1 text-center sm:text-left h-auto sm:pl-12">
          <h3 className="text-lg font-semibold mb-2">{project.head.name}</h3>
          <h3 className="text-lg font-semibold mb-2">
            {project.department.full_name}
          </h3>
          <p className="text-left">{project.abstract}</p>
        </div>
      </div>
      <div className="grid mt-5">
        {userPrivilege !== "View" ? (
          <div className="mb-0">
            <Button
              onClick={openModal1}
              className="adminButton md:w-40 w-full bg-red-800 text-white m-2"
            >
              Add Members
            </Button>
            <Link to={`/update-role/${id}`}>
              <Button className="adminButton md:w-40 w-full bg-red-800 text-white m-2">
                Update Roles
              </Button>
            </Link>
            <Link to={`/edit-project/${id}`}>
              <Button
                className="editButton w-40 bg-red-800 text-white">
                Edit Project
              </Button>
            </Link>
            
          </div>
        ) : null}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:p-3 mt-0 sm:w-9/12">
        {project.members.length !== 0 &&
          project.members.map((val, index) => {
            return (
              <div key={index}>
                <div className="flex flex-col text-lg antialiased items-center sm:mg-2 lg:m-5 font-semibold rounded-lg border shadow-lg sm:p-2 h-80">
                  <div className="p-5">
                    <div className="max-h-40 ">
                      <img
                        className="mb-6 h-40 w-full"
                        src={val.image_url}
                        alt="Project"
                      ></img>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">{val.name}</h3>
                      <h3 className="text-lg font-semibold mb-2">
                        {val.permission}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Project;
