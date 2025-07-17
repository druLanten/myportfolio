export interface Project {
  id: number;
  title: string;
  category: 'graphics' | 'it' | 'video' | 'marketing';
  thumbnail: string;
  description: string;
  problem?: string;
  solution?: string;
  images?: string[];
  technologies?: string[];
}

export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Skill {
  title: string;
  description: string;
  image: string;
  category: 'graphics' | 'it' | 'video' | 'marketing';
}
