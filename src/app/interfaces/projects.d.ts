export interface AorTag {
    id: number;
    name: string;
    description: string;
    department: string;
}

export interface Labs {
    id: number;
    name: string;
    description: string;
    image_url: string;
    department: number;
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
    image_url: string;
    department: number;
    head: number;
    aor_tags: AorTag[];
    labs_tags: LabsTag[];
    coe_tags: any[];
    members: Member[];
    success: boolean;
}

export interface SingleProject {
    head: {
        name: string,
        id: number,
        email: string,
        image_url: string,
        is_staff: boolean,
    },
    department: {
        full_name: string,
        id: number,
        short_name: string,
    },
    aor_tags: AorTag[];
    labs_tags: LabsTag[];
    coe_tags: any[];
    id: number,
    abstract: string,
    paper_link: string,
    members: Member[],
    name: string,
    success: boolean
}
