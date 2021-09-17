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
    filteredProjects : Project[];
    filteredNon_admin_projects : NonAdminProject[];
    non_admin_projects: NonAdminProject[];
    status_code: number;
}
