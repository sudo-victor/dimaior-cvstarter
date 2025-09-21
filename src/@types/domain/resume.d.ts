export interface Resume {
  contact: {
    name: string;
    location: string;
    email: string;
    phone: string;
  };
  linkedinHeadline: string;
  summary: string;
  education: {
    degree: string;
    institution: string;
    period: string;
    status: string;
  }[];
  experience: {
    title: string;
    company?: string;
    description: string[];
    technologies: string[];
  }[];
  skills: {
    technical: string[];
    soft: string[];
  };
  languages?: {
    language: string;
    level: string;
  }[];
  courses?: string;
}