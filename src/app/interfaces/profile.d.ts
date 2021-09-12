// export interface Profile {
//   data: {
//     id: number;
//     password: string;
//     last_login: string;
//     is_superuser: false;
//     name: "";
//     email: "";
//     is_staff: true;
//     dept: number;
//     is_verified: true;
//     groups: [];
//     user_permissions: [];
//     image_url: "http://localhost:8000/media/2.jpg";
//     department: {
//       id: number;
//       full_name: "Computer Science & Engineering";
//       short_name: "CSE";
//       image_url: "https://www.nitt.edu/home/students/facilitiesnservices/ComputerSupportGroup/Octagon-Nov-2018.jpg";
//     };
//   };
//   scholars: [];
//   aors: [
//     {
//       id: number;
//       name: "Robotics";
//       description: "Robotics is an interdisciplinary field that integrates computer science and engineering. Robotics involves design, construction, operation, and use of robots.";
//       department: "ECE";
//     }
//   ];
//   coes: [];
//   labs: [
//     {
//       id: number;
//       name: "Electronic Devices Laboratory";
//       description: "Electronic Devices Laboratory";
//       image_url: "https://www.nitt.edu/home/academics/departments/eee/facilitiesnservices/lab/research_laboratory/networking_research_lab/network_lab4.JPG";
//       department: "CSE";
//     },
//   ];
//   projects: [
//     {
//       id: number;
//       name: "senthil45678";
//       tags: ["nit"];
//       abstract: "hcvbjnkm";
//       paper_link: "https://github.com/delta/research-portal-backen";
//       department: {
//         id: number;
//         full_name: "Instrumentation & Communication Engineering";
//         short_name: "ICE";
//         image_url: "https://www.nitt.edu/home/academics/departments/ice/ice.jpg";
//       };
//       head: {
//         name: "senthilnahan";
//         email: "nishiss@nitt.edu";
//         is_staff: true;
//         image_url: "http://localhost:8000/media/2.jpg";
//       };
//       aor_tags: [
//         {
//           id: 2;
//           name: "Robotics";
//           description: "Robotics is an interdisciplinary field that integrates computer science and engineering. Robotics involves design, construction, operation, and use of robots.";
//           department: "ECE";
//         }
//       ];
//       labs_tags: [
//         {
//           id: number;
//           name: "Electronic Devices Laboratory";
//           description: "Electronic Devices Laboratory";
//           image_url: "https://www.nitt.edu/home/academics/departments/eee/facilitiesnservices/lab/research_laboratory/networking_research_lab/network_lab4.JPG";
//           department: "CSE";
//         },
//       ];
//       coe_tags: [];
//       members: [
//         {
//           name: "senthilnahan";
//           email: "nishiss@nitt.edu";
//           is_staff: true;
//           image_url: "http://localhost:8000/media/2.jpg";
//           permission: "Admin";
//         }
//       ];
//       success: true;
//     }
//   ];
//   non_admin_projects: [
//     {
//       data: {
//         id: number;
//         name: "project14";
//         tags: [];
//         abstract: "loreum ipseum this is abstrac";
//         paper_link: "http://localhost/browser1";
//         department: {
//           id: 4;
//           full_name: "Electrical & Electronics Engineering";
//           short_name: "EEE";
//           image_url: "https://www.nitt.edu/home/academics/departments/EEE/DEPT_PHOTO_FINAL.jpg";
//         };
//         head: {
//           name: "muthua";
//           email: "akarsh@nitt.edu";
//           is_staff: true;
//           image_url: "http://localhost:8000/media/Screenshot%20from%202021-07-31%2022-00-26_xWeBKmB.png";
//         };
//         aor_tags: Array;
//         labs_tags: Array;
//         coe_tags: Array;
//         members: [
//           {
//             name: string;
//             email: string;
//             is_staff: boolean;
//             image_url: string;
//             permission: string;
//           },
//         ];
//         success: true;
//       };
//       access: string;
//     }
//   ];
// }
// export interface AORS {
//   id: null;
//   department: "";
//   name: "";
//   description: "";
//   image_url: "";
// }

// export interface ProfileData {
//     data:               Data;
//     scholars:           any[];
//     aors:               Aor[];
//     coes:               any[];
//     labs:               Aor[];
//     projects:           Project[];
//     non_admin_projects: NonAdminProject[];
//     status_code:        number;
// }

// export interface Aor {
//     id:          number;
//     name:        string;
//     description: string;
//     department:  string;
//     image_url?:  string;
// }

// export interface Data {
//     id:               number;
//     password:         string;
//     last_login:       Date;
//     is_superuser:     boolean;
//     name:             string;
//     email:            string;
//     is_staff:         boolean;
//     dept:             number;
//     is_verified:      boolean;
//     groups:           any[];
//     user_permissions: any[];
//     image_url:        string;
//     department:       Department;
// }

// export interface Department {
//     id:         number;
//     full_name:  string;
//     short_name: string;
//     image_url:  string;
// }

// export interface NonAdminProject {
//     data:   Project;
//     access: string;
// }

// export interface Project {
//     id:         number;
//     name:       string;
//     tags:       string[];
//     abstract:   string;
//     paper_link: string;
//     department: Department;
//     head:       Head;
//     aor_tags:   Aor[];
//     labs_tags:  Aor[];
//     coe_tags:   any[];
//     members:    Head[];
//     success:    boolean;
// }

// export interface Head {
//     name:        string;
//     email:       string;
//     is_staff:    boolean;
//     image_url:   string;
//     permission?: string;
// }

export interface Department {
    id: number;
    full_name: string;
    short_name: string;
    image_url: string;
}

export interface Data {
    id: number;
    password: string;
    last_login: Date;
    is_superuser: boolean;
    name: string;
    email: string;
    is_staff: boolean;
    dept: number;
    is_verified: boolean;
    groups: any[];
    user_permissions: any[];
    image_url: string;
    department: Department;
}

export interface Scholar {
    name: string;
    email: string;
    is_staff: boolean;
    image_url?: any;
    permission: string;
}

export interface Aor {
    id: number;
    name: string;
    description: string;
    department: string;
}

export interface Lab {
    id: number;
    name: string;
    description: string;
    image_url: string;
    department: string;
}

export interface Head {
    name: string;
    email: string;
    is_staff: boolean;
    image_url: string;
}

export interface AorTag {
    id: number;
    name: string;
    description: string;
    department: string;
}

export interface LabsTag {
    id: number;
    name: string;
    description: string;
    image_url: string;
    department: string;
}

export interface Member {
    name: string;
    email: string;
    is_staff: boolean;
    image_url: string;
    permission: string;
}

export interface Project {
    id: number;
    name: string;
    tags: string[];
    abstract: string;
    paper_link: string;
    department: Department;
    head: Head;
    aor_tags: AorTag[];
    labs_tags: LabsTag[];
    coe_tags: any[];
    members: Member[];
    success: boolean;
}

export interface NonAdminProject {
    data: Project;
    access: string;
}

export interface ProfileData {
    data: Data;
    scholars: Scholar[];
    aors: Aor[];
    coes: any[];
    labs: Lab[];
    projects: Project[];
    non_admin_projects: NonAdminProject[];
    status_code: number;
}
