import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useParams } from "react-router";
import {Button, Select, Label} from 'tailwind-react-ui';
import { axiosInstance } from "../../utils/axios";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const UpdateRoles = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [people, setPeople] = useState([{
    name: "", permission: "", image_url: "", email: "", department: "",
  }]);
  const [projectData, setProject] = useState({
    head: {
      email: ''
    }
  });
  const [member, setMember] = useState('');
  const [role, setRole] = useState(0);

  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const updateRole=()=>{
    let url=`/admin_user/update_roles/`;
    axiosInstance({
      method:'POST',
      url:url,
      data:{
        user_id:member,
        project_id:id,
        role:role
      }
    }).then((res:any)=>{
      if (res.data.status_code === 200) {
        toast.success("Member role updated successfully !");
        history.push(`/project/${id}`)
      } else {
        toast.error(res.data.data);
      }
    }).catch((err:Error)=>{
      console.log(err);
    })
  }

  const getProjectDetails = () => {
    let url = `/project/id?projectId=${id}`;
    axiosInstance
      .get(url)
      .then((res: any) => {
        setProject(res.data.data);
        setPeople(res.data.data.members)
      })
      .catch((err: Error) => console.log(err));
  };

  useEffect(() => {
    getProjectDetails();
  }, []);
  
  const openModal = (email:any) =>{
      setIsOpen(true);
      setMember(email)
  }

  const closeModal = () =>{
    setIsOpen(false);
    history.push(`/project/${id}`)
  }

  return (
    <div className="flex flex-col">
      <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <form>
                        <div className="fieldInput">
                            <Label>Permission</Label>
                            <Select
                                className="inputField"
                                name="selectPrivilege"
                                onChange={(e:any) => { setRole(e.target.value)}}
                                options={[
                                { value: 3, label: 'Edit' },
                                { value: 2, label: 'Write' },
                                { value: 1, label: 'View' },
                                ]}
                            />
                        </div>
                        <div className="flex justify-between m-4">
                            <Button onClick={closeModal} className="adminButton w-40 bg-red-800 text-white mr-2">Close</Button>
                            <Button onClick={updateRole} className="adminButton w-40 bg-red-800 text-white ml-2">Update</Button>
                        </div>
                    </form>
                </Modal>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  {/* <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th> */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only"><Button className="w-40 bg-red-800 text-white m-2">Add Tags</Button></span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {people.length !== 0 && (
                  people.map((person) => {
                    return (
                      person.email !== projectData.head.email ? (
                        <tr key={person.email}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src={person.image_url} alt="profile_picture" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                <div className="text-sm text-gray-500">{person.email}</div>
                              </div>
                            </div>
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap"> */}
                            {/* <div className="text-sm text-gray-900">{person.title}</div> */}
                            {/* <div className="text-sm text-gray-500">{person.department}</div> */}
                          {/* </td> */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.permission}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button onClick={()=>openModal(person.email)} className="w-40 bg-red-800 text-white m-2">Edit</Button>
                          </td>
                      </tr>
                      ) : ''
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateRoles;
